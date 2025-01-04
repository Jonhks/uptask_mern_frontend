import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/UseAuth";

const ProfileView = () => {
  const { data, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (data) return <ProfileForm data={data} />;
};

export default ProfileView;
