import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadButton from "@/components/form/UploadButton";

const SettingsDisplay = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { updateProfile, profile, updating } = useUserStore();

  const profileForm = useFormSchema(profile, profileControl, updateProfile);

  const { singleFile } = useFileUpload(
    profileForm.setFieldValue,
    profileForm.values,
    updateProfile
  );

  const handleCancel = () => {
    profileForm.resetForm();
    setEditProfile(false);
  };

  const handleSave = async () => {
    await profileForm.submitForm();
    setEditProfile(false);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-4">
        <div className="p-4 space-y-4 default_border">
          <div className="flex justify-center w-full">
            <div className="space-y-4 max-w-60">
              <div className="overflow-hidden">
                <img src={profile?.avatar} alt="avatar" />
              </div>
              <UploadButton
                title="Change photo"
                loading={updating}
                inputName="avatar"
                action={singleFile}
                disabled={editProfile}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8 ">
        <FormInput
          formik={profileForm}
          disabled={!editProfile}
          formControl={profileControl}
        >
          {editProfile && (
            <div className="space-x-4">
              <Button type="button" variant="cancel" onClick={handleCancel}>
                cancel
              </Button>
              <Button
                variant="save"
                type="button"
                onClick={handleSave}
                disabled={!profileForm.dirty || !profileForm.isValid}
              >
                save
              </Button>
            </div>
          )}
          {!editProfile && (
            <div>
              <Button
                type="button"
                variant="edit"
                onClick={() => setEditProfile(true)}
              >
                edit
              </Button>
            </div>
          )}
        </FormInput>
      </div>
    </div>
  );
};

export default SettingsDisplay;
