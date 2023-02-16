import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  loggedIn: boolean = false;
  displayName?: string;
  photoUrl?: string;
  idUser?: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    
    this.afAuth.setPersistence('local');

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
          this.loggedIn = true;
          this.displayName = user.displayName!;
          this.photoUrl = user.photoURL!;
          this.idUser = user.providerData[0]?.uid;
         
          
      } else {
          this.loggedIn = false;
          
          
      }
  });
   
     
  }
  // Sign in with Google
  GoogleAuth() {

    return this.AuthLogin(new GoogleAuthProvider());

  }

  GoogleOut() {

    this.router.navigate([''])
    return this.afAuth.signOut();

  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {

        console.log('You have been successfully logged in!');
        console.log(result.additionalUserInfo?.profile);

      })
      .catch((error) => {

        console.log(error);

      });
  }

}