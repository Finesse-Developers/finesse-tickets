import "dotenv/config";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import User, { UserDocument } from "../models/User.model";

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

if (!clientID) throw new Error("Client ID not found");
if (!clientSecret) throw new Error("Client secret not found");
if (!callbackURL) throw new Error("Client redirect not found");

passport.use(
  new DiscordStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      scope: ["identify", "guilds"],
    },
    async (accessToken, _refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ discordId: profile.id });
        if (user) {
          done(null, {
            id: user.id,
            accessToken,
          });
        } else {
          const newUser = await User.create({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
          });
          const savedUser = await newUser.save();
          done(null, {
            id: savedUser.id,
            accessToken,
          });
        }
      } catch (error) {
        console.log(error);
        done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  const discordUser = user as UserDocument & { accessToken: string };
  console.log("Serializing User");
  // uses mongodb id instead of discord id
  done(null, { id: discordUser.id, accessToken: discordUser.accessToken });
});

passport.deserializeUser(async (sessionUser, done) => {
  try {
    const { id, accessToken } = sessionUser as {
      id: string;
      accessToken: string;
    };

    const user = await User.findById(id);
    if (!user) return done(null, false);

    console.log("Deserialized User:", user.discordId);
    done(null, {
      user,
      accessToken, // Now correctly retrieved from session, not DB
    });
  } catch (error) {
    done(error, null);
  }
});

export default passport;
