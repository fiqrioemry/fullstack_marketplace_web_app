import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { initialProfileForm } from "../../config";
import { useUserStore } from "../../store/useUserStore";
import { useHandleForm } from "../../hooks/useHandleForm";
import FormControls from "../../components/form/FormControl";
import UserSettingSkeleton from "../../components/loading/UserSettingSkeleton";

const controlProfileForm = [
  {
    name: "fullname",
    label: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "birthday",
    label: "birthday",
    type: "date",
    placeholder: "Add your birthday",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "gender",
    label: "gender",
    type: "select",
    placeholder: "Add your gender",
    style: "flex items-center capitalize",
    componentType: "select",
    options: ["male", "female"],
  },
  {
    name: "phone",
    label: "phone",
    type: "text",
    placeholder: "Add your phone",
    style: "flex items-center capitalize",
    componentType: "input",
  },
];

const Settings = () => {
  const { profile, isProfileLoading, updateUserProfile, getUserProfile } =
    useUserStore();

  const [editProfile, setEditProfile] = useState(false);
  const { formData, setFormData, handleChange } =
    useHandleForm(initialProfileForm);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname,
        birthday: profile.birthday,
        gender: profile.gender,
        phone: profile.phone,
        email: profile.email,
        avatar: profile.avatar,
      });
    }
  }, [profile, setFormData]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setEditProfile(false);
    updateUserProfile(formData);
  };

  return (
    <section className="space-y-6">
      {!profile && <UserSettingSkeleton />}

      {profile && (
        <div className="grid grid-cols-12 gap-4 p-4 default_border">
          <div className="col-span-4">
            <div className="p-4 space-y-4 default_border">
              <div className="h-60">
                <img src={profile.avatar} alt="avatar" />
              </div>
              <Button className="w-full">Change Photo</Button>
            </div>
          </div>
          <div className="col-span-8 space-y-4">
            <form onSubmit={handleProfileUpdate}>
              <FormControls
                formData={formData}
                handleChange={handleChange}
                formControls={controlProfileForm}
                disabled={!editProfile}
              />

              <div className="flex justify-end space-y-2">
                {editProfile ? (
                  <div className="flex items-center  gap-2">
                    <Button type="button" onClick={() => setEditProfile(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update</Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setEditProfile(true)}>
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;
