import ProfileForm from "./components/profileForm"
import { fetchProfile } from "./libs/server/fetchProfile";

export default async function Page() {
  const profileData = await fetchProfile();
  return (
    <div className="max-w-3xl mx-auto">
      <ProfileForm initialProfile={profileData} />;
    </div>
  )
}