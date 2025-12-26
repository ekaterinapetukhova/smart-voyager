import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Popup } from "../../components/common/Popup.tsx";
import { updateUserStore, useTokenStore } from "../../store/user-store.ts";
import { Currency, Gender, tripGoals, TripGoals, tripInterest, TripInterest, User } from "../../types/user.types.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";
import { mapObject } from "../../utils/map-object.ts";
import { validUserUpdateSchema } from "../../validation/user.validation.ts";
import { FormSelect } from "../../components/common/form/FormSelect.tsx";
import { prepareCitiesSelectOptions, prepareCountriesSelectOptions } from "../../utils/get-countries-and-cities.ts";
import { useCountriesAndCities } from "../../hooks/use-countries-and-cities.ts";
import { FormAutocompleteSelect } from "../../components/common/form/FormAutocompleteSelect.tsx";
import { Button } from "../../components/common/Button.tsx";
import { SubTitle } from "../../components/common/SubTitle.tsx";

interface UserProfilePopupProps {
  user: User;
  onClose: () => void;
}

export function UserProfilePopup(props: UserProfilePopupProps) {
  const { logout } = useTokenStore();

  const user = props.user;

  const queryClient = useQueryClient();

  const { data: countriesAndCities } = useCountriesAndCities();

  const tripGoalsForm = useForm<Record<TripGoals, boolean>>({
    initialData: mapObject(tripGoals, (_, k) => user.tripGoals.includes(k)),
    validation: z.object({}),
  });

  const tripInterestForm = useForm<Record<TripInterest, boolean>>({
    initialData: mapObject(tripInterest, (_, k) => user.tripInterest.includes(k)),
    validation: z.object({}),
  });

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
    validation: validUserUpdateSchema
      .pick({
        name: true,
        birthDate: true,
        gender: true, //
        city: true, //
        country: true, //
        shouldBeVisible: true,
        languages: true, //
        description: true, //
        currency: true,
      })
      .check((ctx) => {
        if (ctx.value.shouldBeVisible) {
          if (!ctx.value.country) {
            ctx.issues.push({
              code: "custom",
              message: "Country must be selected",
              input: ctx.value,
              continue: true,
              path: ["country"],
            });
          }

          if (!ctx.value.city) {
            ctx.issues.push({
              code: "custom",
              message: "City must be selected",
              input: ctx.value,
              continue: true,
              path: ["city"],
            });
          }

          if (!ctx.value.languages) {
            ctx.issues.push({
              code: "custom",
              message: "Languages must be added",
              input: ctx.value,
              continue: true,
              path: ["languages"],
            });
          }

          if (!ctx.value.description) {
            ctx.issues.push({
              code: "custom",
              message: "Description must be added",
              input: ctx.value,
              continue: true,
              path: ["description"],
            });
          }
        }
      }),
    submit: {
      fn: async () => {
        const request = authorizedFetch();

        const tripGoals = Object.entries(tripGoalsForm.data)
          .filter(([_, v]) => v)
          .map(([k, _]) => k);

        const tripInterest = Object.entries(tripInterestForm.data)
          .filter(([_, v]) => v)
          .map(([k, _]) => k);

        await request({ method: "PATCH", path: `user/${user.id}`, data: { tripGoals, tripInterest, ...form.data } });
      },
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["me"] });
        props.onClose();
        void updateUserStore();
      },
    },
  });

  useEffect(() => {
    form.update({});
  }, []);

  if (!countriesAndCities) {
    return;
  }

  const countriesOptions = prepareCountriesSelectOptions(countriesAndCities);

  const citiesOptions = prepareCitiesSelectOptions(countriesAndCities, form.data.country);

  const mainUserInfo = (
    <>
      <div className="flex flex-col gap-y-2 text-text">
        <span className="font-bold text-xl">Email</span>
        <span>{user.email}</span>
      </div>
      <Input label="Name" type="text" form={form} fieldKey="name" />
      <Input label="Birth date" type="date" form={form} fieldKey="birthDate" />
      <Input label="Gender" type="radio" form={form} fieldKey="gender" options={[Gender.Male, Gender.Female]} />
      <FormSelect
        label="Country"
        options={countriesOptions}
        initialOptionLabel="Choose country"
        form={form}
        fieldKey="country"
      />
      <FormAutocompleteSelect
        label="City"
        form={form}
        fieldKey="city"
        options={citiesOptions}
        initialOptionLabel="Choose city"
        searchThreshold={2}
      />
      <Input label="Currency" type="radio" form={form} fieldKey="currency" options={Object.values(Currency)} />
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

  const tripMateUserInfo = (
    <>
      <Input label="Languages" type="text" form={form} fieldKey="languages" />
      <Input label="Description" type="textarea" form={form} fieldKey="description" />
      <div className="flex flex-col gap-y-2">
        <h3 className="text-text font-bold text-xl">Trip goals</h3>
        <div className="flex gap-2 flex-wrap">{tripGoalsInputs}</div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-text font-bold text-xl">Trip interests</h3>
        <div className="flex gap-2 flex-wrap">{tripInterestInputs}</div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-text font-bold text-xl">Visibility</h3>
        <Input type="checkbox" form={form} fieldKey="shouldBeVisible" label="Should be visible" />
      </div>
    </>
  );

  return (
    <Popup closePopup={props.onClose} containerClassName="w-3/4 xl:w-2/5 h-4/5">
      <div className="py-4 px-6 overflow-y-scroll flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-4">
          <div className="w-full">
            <SubTitle content="Main" />
            <span className="w-full h-0.5 bg-accent flex mt-1"></span>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-x-10 gap-y-4">
            <div className="flex flex-col gap-y-4 md:w-1/2">{mainUserInfo}</div>
            <div className="sm:w-1/2 flex sm:justify-center">
              <Avatar src={props.user.avatar} className="size-50" />
            </div>
          </div>
          <div className="w-full">
            <SubTitle content="Trip mate" />
            <span className="w-full h-0.5 bg-accent flex mt-1"></span>
          </div>
          <div className="flex flex-col gap-y-4">{tripMateUserInfo}</div>
        </div>
        <div className="flex flex-col gap-y-2 w-1/2 sm:w-1/3 mx-auto">
          <form.SubmitButton label="Set settings" size="medium" />
          <Button label="Log out" size="medium" onClick={logout} />
        </div>
      </div>
    </Popup>
  );
}
