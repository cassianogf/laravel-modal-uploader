<?php

namespace App\Http\Controllers;
use App\Http\Requests;
use App\Http\Requests\PrepareUploadRequest;

use Auth;

class ExampleUpload extends Controller
{
    //================================================================================================
    //  Upload
    //================================================================================================

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

    //================================================================================================
}