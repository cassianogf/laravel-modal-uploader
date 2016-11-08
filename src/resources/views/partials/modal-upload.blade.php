    <!-- Modal Upload -->
    <div class="modal fade" id="upload-file" tabindex="-1" role="dialog" aria-labelledby="modal-upload-file" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    Send Image
                </div>
                <form data-action="{{ url('Put Your Url Here') }}" data-request="POST" enctype="multipart/form-data" id="uploadForm">
                    <div class="modal-body">
                            
                            <input type="file" id="fileUpload" name="image" style="display: none;" accept="image/*">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    
                        <div class="image-holder"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <input type="button" class="btn btn-default" id="send-file" value="Upload">
                    </div>
                </form>
            </div>
        </div>
    </div>    
