import ProfileForm from "./components/profileForm";
import { fetchProfile } from "./libs/server/fetchProfile";

export default async function ProfilePage() {
  const profileData = await fetchProfile();
  console.log("Profile data:", profileData); // Log the fetched profile data
  return <ProfileForm initialProfile={profileData} />;
}
