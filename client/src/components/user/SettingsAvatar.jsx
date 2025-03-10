import { useUserStore } from "@/store/useUserStore";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFormSchema } from "@/hooks/useFormSchema";
import UploadButton from "@/components/form/UploadButton";

const SettingsAvatar = () => {
  const { updateProfile, profile, loading } = useUserStore();
  const avatarForm = useFormSchema(updateProfile, profile);

  const { singleFile } = useFileUpload(
    avatarForm.setFieldValue,
    avatarForm.values,
    updateProfile
  );

  return (
    <div className="col-span-1 mb-4">
      <div className="flex justify-center">
        <div className="space-y-6">
          <img
            alt="avatar"
            src={profile?.avatar}
            className="w-40 h-40 overflow-hidden border"
          />
          <UploadButton
            title="Change photo"
            loading={loading}
            inputName="avatar"
            action={singleFile}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsAvatar;
