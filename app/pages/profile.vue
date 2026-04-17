<script setup lang="ts">
const { demoUser, userEntries } = useMockData();

type ProfileContent = {
  tasteIdentityTitle: string;
  favoriteDrinkLabel: string;
  actions: { edit: string; save: string; cancel: string };
  placeholders: {
    displayName: string;
    homeCity: string;
    favoriteDrink: string;
    bio: string;
  };
};

const fallbackContent: ProfileContent = {
  tasteIdentityTitle: "Taste identity",
  favoriteDrinkLabel: "Favourite drink",
  actions: { edit: "Edit", save: "Save", cancel: "Cancel" },
  placeholders: {
    displayName: "Display name",
    homeCity: "Home city",
    favoriteDrink: "Favourite drink",
    bio: "Bio",
  },
};

const { data: profileData } = await useAsyncData("profile-content", () =>
  queryCollection("content").where("stem", "=", "profile/index").first()
);

const content = computed(() => (profileData.value as ProfileContent | null) ?? fallbackContent);
</script>

<template>
  <ProfileForm :user="demoUser" :entries="userEntries" :copy="content" />
</template>
