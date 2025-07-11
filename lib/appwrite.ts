import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: "com.svr.grubrush",
	databaseID: "686ff96f000cfb2f7803",
	bucketID: "687167fe0019fe691479",
	userCollectionID: "686ff9b6002daedad13e",
	categoriesCollectionID: "687006ea003d43acb6c5",
	menuCollectionID: "6870e3e0001e84e0a5a9",
	customizationsCollectionID: "687165b0001238c072e1",
	menuCustomizationsCollectionID: "687166d60017870e762b"
}

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectID)
	.setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name)
		if(!newAccount) throw Error;
		
		await signIn({ email, password });
		
		const avatarUrl = avatars.getInitialsURL(name);
		
		return await databases.createDocument(
			appwriteConfig.databaseID,
			appwriteConfig.userCollectionID,
			ID.unique(),
			{ email, name, accountId: newAccount.$id, avatar: avatarUrl }
		);
	} catch (e) {
		throw new Error(e as string);
	}
}

export const signIn = async ({ email, password }: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
	} catch (e) {
		throw new Error(e as string);
	}
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if(!currentAccount) throw Error;
		
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseID,
			appwriteConfig.userCollectionID,
			[Query.equal('accountId', currentAccount.$id)]
		)
		
		if(!currentUser) throw Error;
		
		return currentUser.documents[0];
	} catch (e) {
		console.log(e);
		throw new Error(e as string);
	}
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
	try {
		const queries: string[] = [];
		
		if(category) queries.push(Query.equal('categories', category));
		if(query) queries.push(Query.search('name', query));
		
		const menus = await databases.listDocuments(
			appwriteConfig.databaseID,
			appwriteConfig.menuCollectionID,
			queries,
		)
		
		return menus.documents;
	} catch (e) {
		throw new Error(e as string);
	}
}

export const getCategories = async () => {
	try {
		const categories = await databases.listDocuments(
			appwriteConfig.databaseID,
			appwriteConfig.categoriesCollectionID,
		)
		
		return categories.documents;
	} catch (e) {
		throw new Error(e as string);
	}
}