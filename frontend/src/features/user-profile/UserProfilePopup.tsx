import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popup } from "../../components/common/Popup.tsx";
import { updateUserStore, useTokenStore, useUserStore } from "../../store/user-store.ts";
import { Currency, Gender, tripGoals, TripGoals, tripInterest, TripInterest, User } from "../../types/user.types.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { Button } from "../../components/common/Button.tsx";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";
import { mapObject } from "../../utils/map-object.ts";
import { validUserUpdateSchema } from "../../validation/user.validation.ts";

interface UserProfilePopupProps {
  user: User;
  onClose: () => void;
}

export function UserProfilePopup(props: UserProfilePopupProps) {
  const { logout } = useTokenStore();

  const user = props.user;

  const queryClient = useQueryClient();

  const tripGoalsForm = useForm<Record<TripGoals, boolean>>({
    initialData: mapObject(tripGoals, (_, k) => user.tripGoals.includes(k) ?? false),
    validation: z.object({}),
  });

  const tripInterestForm = useForm<Record<TripInterest, boolean>>({
    initialData: mapObject(tripInterest, (_, k) => user.tripInterest.includes(k) ?? false),
    validation: z.object({}),
  });

  console.log(user);
  const form = useForm({
    initialData: {
      name: user.name,
      birthDate: user.birthDate,
      gender: user.gender,
      city: user.city ?? "",
      password: "",
      country: user.country ?? "",
      shouldBeVisible: user.shouldBeVisible,
      languages: user.languages ?? "",
      description: user.description ?? "",
      currency: user.currency,
    },
    validation: validUserUpdateSchema.pick({
      name: true,
      birthDate: true,
      gender: true,
      city: true,
      country: true,
      shouldBeVisible: true,
      languages: true,
      description: true,
      currency: true,
    }),
  });

  const update = useMutation({
    mutationFn: async () => {
      const request = authorizedFetch();

      const tripGoals = Object.entries(tripGoalsForm.data)
        .filter(([_, v]) => v)
        .map(([k, _]) => k);

      const tripInterest = Object.entries(tripInterestForm.data)
        .filter(([_, v]) => v)
        .map(([k, _]) => k);

      await request({ method: "PATCH", path: `user/${user.id}`, data: { tripGoals, tripInterest, ...form.data } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
  //
  // const userInfoItems = Object.entries(user)
  //   .filter(([k, v]) => k !== "avatar" && k !== "id" && k !== "name" && v !== null)
  //   .map(([k, v]) => {
  //     const label = k === "birthDate" ? "Birth date" : k;
  //     let value = v;
  //     if (typeof v === "number") {
  //       value = v.toString();
  //     }
  //     if (typeof v === "boolean") {
  //       value = v ? "yes" : "no";
  //     }
  //
  //     return (<>
  //         <li key={k} className="flex flex-col gap-y-2">
  //           <span className="text-accent font-bold text-xl">{label[0].toUpperCase() + label.slice(1)}</span>
  //           <span className="text-text">{value}</span>
  //         </li>
  //       </>
  //     );
  //   });
  const userInfoItems = (
    <>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Email</span>
        <span className="text-text">{user.email}</span>
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Name</span>
        <Input type="text" form={form} fieldKey="name" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Birth date</span>
        <Input type="date" form={form} fieldKey="birthDate" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Gender</span>
        <Input type="radio" form={form} fieldKey="gender" options={[Gender.Male, Gender.Female]} />
      </li>
      <li className="flex flex-col gap-y-2">
        <Input type="checkbox" form={form} fieldKey="shouldBeVisible" label="Should be visible" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Country</span>
        <Input type="text" form={form} fieldKey="country" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">City</span>
        <Input type="text" form={form} fieldKey="city" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Languages</span>
        <Input type="text" form={form} fieldKey="languages" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Description</span>
        <Input type="text" form={form} fieldKey="description" />
      </li>
      <li className="flex flex-col gap-y-2">
        <span className="text-accent font-bold text-xl">Currency</span>
        <Input type="radio" form={form} fieldKey="currency" options={Object.values(Currency)} />
      </li>
    </>
  );

  const tripGoalsInputs = Object.values(
    mapObject(tripGoals, (v, key) => {
      return <Input key={key} type="checkbox" form={tripGoalsForm} fieldKey={key} label={v} />;
    })
  );

  const tripInterestInputs = Object.values(
    mapObject(tripInterest, (v, key) => {
      return <Input key={key} type="checkbox" form={tripInterestForm} fieldKey={key} label={v} />;
    })
  );

  return (
    <Popup closePopup={props.onClose} containerClassName="w-2/3 h-4/5">
      <div className="px-4 py-2 overflow-y-scroll">
        <h2 className="text-3xl font-bold text-text mb-4">{props.user.name}</h2>
        <div className="flex gap-x-4">
          <ul className="grow">{userInfoItems}</ul>
          <Avatar src={props.user.avatar} className="size-60" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-accent font-bold text-xl">Trip goals</h3>
          <div className="flex gap-x-2 flex-wrap">{tripGoalsInputs}</div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-accent font-bold text-xl">Trip interests</h3>
          <div className="flex gap-x-2 flex-wrap">{tripInterestInputs}</div>
        </div>
        <div className="flex justify-evenly pt-2">
          <div className="w-xs mx-auto">
            <Button
              label="send"
              size="medium"
              onClick={() => {
                void update.mutateAsync().then(() => {
                  props.onClose();
                  void updateUserStore();
                });
              }}
            />
          </div>
          <div className="w-xs mx-auto">
            <ButtonLink
              label="Log out"
              size="medium"
              componentVariants={{
                button: {
                  selected: true,
                  onClick: () => {
                    logout();
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
}
