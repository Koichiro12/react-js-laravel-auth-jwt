<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Response;
use Validator;

class AuthController extends Controller
{
    //

 /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','confirmed','min:8']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
       
        return response()->json($user,201);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => ['required','email'],
            'password' => ['required']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $credential = request(['email','password']);
        if(!$token = auth('api')->attempt($credential)){
            return response()->json(['error' => 'Unauthorized'],401);
        }
        return $this->respondWithToken($token);
    }

    public function logout(Request $request){
        auth('api')->logout();
        return response()->json(['message' => 'Logout Successfully'],200);
    }

    public function me(Request $request){
        return response()->json(auth('api')->user());
    }

    public function refresh(Request $request){
        return $this->respondWithToken(auth('api')->refresh());
    }




}
