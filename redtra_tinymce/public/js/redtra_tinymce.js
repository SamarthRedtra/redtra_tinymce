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
            default_link_target: '_blank',
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

            images_upload_handler: function (blobInfo, success, failure) {
                let xhr = new XMLHttpRequest();
                xhr.withCredentials = true; // Include credentials
                xhr.open('POST', '/api/method/upload_file');

                // Add CSRF token to the request
                let csrf_token = frappe.csrf_token || $('[name="csrf_token"]').attr('content');
                console.log(csrf_token);
                xhr.setRequestHeader('X-Frappe-CSRF-Token', csrf_token);

                xhr.onload = function () {
                    let json = JSON.parse(xhr.responseText);
                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }
                    if (!json || typeof json.message.file_url !== 'string') {
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }
                    success(json.message.file_url);
                };

                let formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            },



            setup: function (editor) {
                that.editor_id = editor.id;
                editor.on('Change', function (e) {
                    that.parse_validate_and_set_in_model(e.level.content);
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
            if (this.frm && this.frm.doc) {
                if (!this.frm.doc.__setContent) {
                    if (value) {
                        this.activeEditor.setContent(value);
                    } else {
                        this.activeEditor.setContent('');
                    }
                    this.frm.doc.__setContent = 1;
                }
            } else {
                console.warn('Form document is not defined');
            }
        } catch (error) {
            console.error('Error setting formatted input:', error);
        }
    }
};