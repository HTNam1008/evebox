import AccountPage from "./components/accountsPage"
import { fetchUsers } from "./lib/server/fetchUsers"

export default async function Page(){
    const initialUsers = await fetchUsers(1, 10);
    return(
        <AccountPage initialUsers={initialUsers}/>
    )
}

