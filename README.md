## laravel-modal-uploader
Simple Js and XHR based Modal to upload a single file (Like WhatsApp Web previous versions).

## Requirements

1. [Laravel 4+](http://laravel.com/docs/5.1#installation)
4. Bootstrap 3+
5. Jquery

## Basic Usage:

Step 1. Create the route for upload and replace into 'resources/views/partials/modal-upload.blade.php' 
```html
	<form data-action="{{ url('Put Your Url Here') }}" data-request="POST" enctype="multipart/form-data" id="uploadForm">
```

Step 2. Set the header on the view that you use to upload files
```html
    <script src="{{ url('js/modal-uploader.js') }}"></script>
    
```

Step 3. In the same file, include the modal
```html
    @include('partials.modal-upload')
```

Step 4. Open the Controller that will receive the route method and put something like this
```php
    public function upload(PrepareUploadRequest $request) {
        $user = Auth::user();

        $destinationPath = "attachment/";
        $file = $request->file('file');

        if($file != null) {
            $filename = $user->id . time();

            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            $final_location = $destinationPath;
            $request->file('file')
                ->move($final_location, $filename.'.'. strtolower($request->file('file')
                ->getClientOriginalExtension()));

        }
        
        return response('200');
    }
```
##Enjoy!

