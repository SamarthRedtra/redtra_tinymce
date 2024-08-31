frappe.ui.form.ControlTextEditor = class ControlTextEditor extends frappe.ui.form.ControlCode {
    make_wrapper() {
        super.make_wrapper();
    }

    make_input() {
        this.has_input = true;
        this.make_tinymce_editor();
    }

    make_tinymce_editor() {
        const that = this;
        this.quill_container = $('<div>').appendTo(this.input_area);

        tinymce.init({
            target: this.input_area,
            toolbar: [
                'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks |',
                'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist |',
                'forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak |',
                'charmap emoticons | fullscreen preview save print | insertfile image media pageembed template link anchor codesample |',
                'a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags'
            ].join(' '),
            font_size_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            plugins: [
                'advlist', 'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen', 'help',
                'image', 'link', 'lists', 'searchreplace', 'spellchecker', 'code', 'codesample',
                'media', 'table', 'visualblocks', 'visualchars', 'wordcount', 'anchor', 'pageembed',
                'template', 'print', 'preview', 'importcss', 'save', 'insertdatetime', 'autosave',
                'directionality', 'textpattern', 'noneditable', 'quickbars', 'advtable', 'contextmenu',
                'textcolor', 'textpattern', 'legacyoutput', 'bbcode', 'toc', 'wordcount'
            ],
            powerpaste_googledocs_import: 'prompt',
            entity_encoding: 'raw',
            convert_urls: true,
            content_css: false,
            toolbar_sticky: true,
            promotion: false,
            valid_elements: '*[*]', // Allow all elements and attributes
            extended_valid_elements: 'p[style|class],ol,ul,li,div[style|class]',
            // other TinyMCE options...
            default_link_target: '_blank',
            forced_root_block: 'div', // Set default root block element
            force_br_newlines: true, // Ensure <br> is not forced
            force_p_newlines: false, 
            height: 500,
            menubar: 'file edit view insert format tools table help',
            statusbar: true,
            quickbars_insert_toolbar: 'quickimage quicktable',
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage',
            contextmenu: 'link image imagetools table configurepermanentpen',
            a11y_advanced_options: true,
            skin: 'oxide-dark',
            content_css: 'default',
            file_picker_callback: function (callback, value, meta) {
                if (meta.filetype === 'image') {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function () {
                        var file = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            var id = 'blobid' + (new Date()).getTime();
                            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            callback(blobInfo.blobUri(), { title: file.name });
                        };
                        reader.readAsDataURL(file);
                    };
                    input.click();
                }
            },
            images_upload_handler: example_image_upload_handler,
            setup: function (editor) {
                that.editor_id = editor.id;
                let isEnterKeyPressed = false;
            
                // Track Enter key presses
                editor.on('keydown', function (e) {
                   
                    if (e.keyCode === 13) { // Enter key
                        isEnterKeyPressed = true;
                    } else {
                        isEnterKeyPressed = false;
                    }
                    console.log(e.keyCode,isEnterKeyPressed);
                });
            
                editor.on('change', function (e) {
                    if (!isEnterKeyPressed) {
                        const transformedContent = transformNumberedLists(e.level.content);
                        that.parse_validate_and_set_in_model(transformedContent);
                        console.log('Content changed:', transformedContent);
                    }
                    console.log(isEnterKeyPressed);
                });
            
                editor.on('init', function (e) {
                    editor.setContent(that.value);
                });
            }
        });

        this.activeEditor = tinymce.activeEditor;
    }

    set_formatted_input(value) {
        try {
            if (this.activeEditor) {
                if (value) {
                    this.activeEditor.setContent(value);
                } else {
                    this.activeEditor.setContent('');
                }
            } else {
                console.warn('Active editor is not defined');
            }
        } catch (error) {
            console.error('Error setting formatted input:', error);
        }
    }
    get_input_value() {
        if (this.activeEditor) {
            let content = this.activeEditor.getContent({ format: 'raw' });
            return content ? content : '';
        }
        return '';
    }
};

// Function to transform numbered lists
function transformNumberedLists(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach((item) => {
        const text = item.textContent;
        if (/^\d+\. /.test(text)) {
            item.innerHTML = text.replace(/^\d+\. /, `<strong>${text.match(/^\d+\. /)}</strong>`);
        }
    });

    return tempDiv.innerHTML;
}

const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false; // Set to true if credentials (such as cookies) are required
    xhr.open('POST', '/api/method/upload_file'); // Set your upload endpoint

    // Set the CSRF token for security
    const csrf_token = frappe.csrf_token || $('[name="csrf_token"]').attr('content');
    xhr.setRequestHeader('X-Frappe-CSRF-Token', csrf_token);

    // Monitor upload progress
    xhr.upload.onprogress = (e) => {
        progress(e.loaded / e.total * 100); // Call the progress function with the upload percentage
    };

    // Handle the response
    xhr.onload = () => {
        if (xhr.status === 403) {
            reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
            return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
            reject('HTTP Error: ' + xhr.status);
            return;
        }

        let json;
        try {
            json = JSON.parse(xhr.responseText); // Parse the JSON response
            if (!json || typeof json.message.file_url !== 'string') {
                reject('Invalid JSON: ' + xhr.responseText);
                return;
            }

            // Resolve the Promise with the file URL
            resolve(window.origin + json.message.file_url);
        } catch (error) {
            reject('Error parsing JSON: ' + xhr.responseText);
        }
    };

    // Handle network errors
    xhr.onerror = () => {
        reject('Image upload failed due to a network error.');
    };

    // Prepare and send the FormData
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
});
