import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popup } from "../../components/common/Popup.tsx";
import { useTokenStore, useUserStore } from "../../store/user-store.ts";
import { tripGoals, TripGoals, tripInterest, TripInterest, User } from "../../types/user.types.ts";
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
  const { user } = useUserStore();

  const queryClient = useQueryClient();

  const tripGoalsForm = useForm<Record<TripGoals, boolean>>({
    initialData: mapObject(tripGoals, (_, k) => user?.tripGoals.includes(k) ?? false),
    validation: z.object({}),
  });

  const tripInterestForm = useForm<Record<TripInterest, boolean>>({
    initialData: mapObject(tripInterest, (_, k) => user?.tripInterest.includes(k) ?? false),
    validation: z.object({}),
  });

  const form = useForm({
    initialData: {
      city: user?.city ?? "",
      country: user?.country ?? "",
    },
    validation: validUserUpdateSchema.pick({ city: true, country: true }),
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

      await request({ method: "PATCH", path: `user/${user?.id}`, data: { tripGoals, tripInterest, ...form.data } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  if (!user) {
    return;
  }

  const userInfoItems = Object.entries(user)
    .filter(([k, v]) => k !== "avatar" && k !== "id" && k !== "name" && v)
    .map(([k, v]) => {
      const label = k === "birthDate" ? "Birth date" : k;

      return (
        <li key={k} className="flex flex-col gap-y-2">
          <span className="text-accent font-bold text-xl">{label[0].toUpperCase() + label.slice(1)}</span>
          <span className="text-text">{v}</span>
        </li>
      );
    });

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
        <div className="w-md">
          <Input type="text" form={form} fieldKey="city" label="City" />
          <Input type="text" form={form} fieldKey="country" label="Country" />
        </div>
        <Button
          label="send"
          size="medium"
          onClick={() => {
            update.mutate();
          }}
        />
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
    </Popup>
  );
}
