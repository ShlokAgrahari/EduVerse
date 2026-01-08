import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import keys from "./keys.js"
passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
   clientID:keys.google.clientID,
   clientSecret:keys.google.clientSecret

}),()=>{}
)