import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('wanderlust');

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    user: {
        // Profile page-er location/nationality — optional, default empty.
        additionalFields: {
            location: { type: "string", required: false, defaultValue: "" },
            nationality: { type: "string", required: false, defaultValue: "" },
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});