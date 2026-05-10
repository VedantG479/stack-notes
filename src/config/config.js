const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), 
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), 
    appwriteUsersTableId: String(import.meta.env.VITE_APPWRITE_USERS_TABLE_ID), 
    appwriteArticlesTableId: String(import.meta.env.VITE_APPWRITE_ARTICLES_TABLE_ID)
}

export default config