/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { profileControl } from "@/config";
import { formatToRupiah } from "@/lib/utils";
import { Calendar, DollarSign } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import ChangeAvatar from "@/components/form/ChangeAvatar";
import { DialogForm } from "@/components/form/DialogForm";

const ProfileSettings = () => {
  const { updateProfile, profile, loading } = useUserStore();

  const profileForm = useFormSchema(updateProfile, profile, profileControl);

  return (
    <div className="aspect-ratio col-span-1 border rounded-lg p-4">
      <ProfileAvatar profile={profile} />

      <ProfileAccount profile={profile} />

      <div className="flex gap-2">
        <DialogForm
          size="default"
          state={profile}
          action={updateProfile}
          control={profileControl}
          textButton="Edit Profile"
          title="Edit Profile Form"
        />
        <ChangeAvatar
          form={profileForm}
          disabled={loading}
          action={updateProfile}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;

const ProfileAvatar = ({ profile }) => {
  return (
    <div className="flex flex-col items-center text-center border-b pb-2 mb-4">
      <img
        alt="Avatar"
        src={profile.avatar}
        className="w-24 h-24 rounded-full border-4"
      />
      <h4>{profile.fullname}</h4>
      <span>{profile.email}</span>
    </div>
  );
};

const ProfileAccount = ({ profile }) => {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center font-medium  gap-2">
          <DollarSign className="w-5 h-5" />
          Account Balance
        </div>
        <span className="w-1/2">: {formatToRupiah(profile.balance)}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center font-medium gap-2">
          <Calendar className="w-5 h-5" />
          Joined Date
        </div>
        <span className="w-1/2">: {format(profile.createdAt, "PPP")}</span>
      </div>
    </div>
  );
};
