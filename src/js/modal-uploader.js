/*
laravelModalUploader - https://github.com/cassianogf/laravel-modal-uploader/
Version: 1.0
Author: Cassiano Guerra <cassianogf@gmail.com>
*/

jQuery(function(){

    //================================================================================================
    //  Dom Elements
    //================================================================================================

    // Modals
    var uploadModal = $("#upload-file");
    var uploadViewModal = $("#upload-view");

    // Modal Upload Holder
    var sendImageHolder = uploadModal.find(".image-holder"); 
    
    // Modal Upload View Holder
    var viewImageHolder = uploadViewModal.find(".image-holder"); 

    // Form
    var uploadForm = $("#uploadForm");
    var fileInput = $("#fileUpload");

    // Buttons
    var sendFile = "#send-file";
    var viewFile = ".image-upload";

    //================================================================================================


    //------ File Input Method
    fileInput.on('change', function () {
        var imgPath = $(this)[0].value;
        var ext = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        sendImageHolder.empty();


        if(imgPath == undefined || imgPath == '' || imgPath == null) return;

        if (ext == "gif" || ext == "png" || ext == "jpg" || ext == "jpeg") {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                         "src": e.target.result,
                            "class": "thumb-image"
                    }).appendTo(sendImageHolder);
                }
                sendImageHolder.show();
                reader.readAsDataURL($(this)[0].files[0]);

                uploadModal.modal('toggle');
            } else {
                alert("Esse navegador não suporta Upload de Arquivos Instantâneos, por favor use Google Chrome, Firefox, Safari ou Opera em suas últimas versões.");
            }
        } else {
            alert("Por enquanto o sistema só aceita Imagens!");
        }
     });


    //------ Modal Send File
    $(document).on('click', sendFile, function() {
        uploadModal.modal('toggle');
    
        // Convert JQuery Object to DOM Element (PS: FormData only read DOM)
        var form = uploadForm[0];

        var data = new FormData(form);
        var url = uploadForm.data('action');
        var request = uploadForm.data('request');

        data.append('file', fileInput[0].files[0]);


        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.responseText);
            }
        }        
        xhr.open(request, url, true);
        xhr.send(data);        
    })


    //------ Modal View File
    $(document).on('click', viewFile, function() {
        uploadViewModal.modal('toggle');

        var image_url = $(this).attr('src');

        viewImageHolder.empty();

        viewImageHolder.append("<img src='" + image_url + "'>")

        $('#download-file').attr('href', image_url);
    })


    //----- Quickfix Same Image Isn't Show
    uploadViewModal.on('hidden.bs.modal', function () {
        fileInput.val("");
    })
});
