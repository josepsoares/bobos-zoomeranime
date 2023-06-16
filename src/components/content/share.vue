<script lang="ts" setup>
import { onMounted, ref } from "vue";
import toast from "@components/toast.vue";

import ShareIcon from "@icons/bx-share-alt.svg";
import LinkIcon from "@icons/bx-link.svg";
import TwitterIcon from "@icons/bxl-twitter.svg?component";
import WhatsAppIcon from "@icons/bxl-whatsapp.svg?component";
import TelegramIcon from "@icons/bxl-telegram.svg?component";

import { isMobileDevice } from "@utils/helpers";

const { url, title, subjects } = defineProps<{
  url: string;
  title: string;
  subjects: string;
}>();

const toastText = ref("");
const show = ref(false);
const type = ref("success");

const showToast = (toastMessage: string, toastType: "success" | "error") => {
  toastText.value = toastMessage;
  type.value = toastType;
  show.value = true;
};

const hideToast = () => {
  show.value = false;
};

const webShareAPISupported = ref(false);

const message = "eu li um post porreiro no blog do bobo";
const encodedUrl = encodeURIComponent(url);
const encodedTitle = encodeURIComponent(title);
const encodedMessage = encodeURIComponent(message);
const encodedHastags = encodeURIComponent(subjects);
const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}&hashtags=${encodedHastags}`;
const whatsappShareUrl = isMobileDevice()
  ? `https://api.whatsapp.com/send?url=${encodedUrl}&title=${encodedTitle}`
  : `https://wa.me/?text=${encodeURIComponent(`${message} - ${url}`)}`;
const telegramShareUrl = `https://telegram.me/share/url?url=${encodedUrl}&title=${encodedTitle}`;

function openSocialMediaWindow(e: Event, url: string) {
  e.preventDefault();

  const w = 600;
  const h = 400;
  const x = (screen.width - w) / 2;
  const y = (screen.height - h) / 2;
  const features = `width=${w},height=${h},left=${x},top=${y},centerscreen='yes'`;

  window.open(url, "_blank", features);
}

async function handleWebShare() {
  try {
    if (webShareAPISupported) {
      navigator.share({
        title,
        url,
        text: `Shared from asd`,
      });
    }
  } catch (error) {
    webShareAPISupported.value = false;
  }
}

async function handleCopyPostLinkBtnClick() {
  try {
    await navigator.clipboard.writeText(url);
    showToast("Link copiado com sucesso", "success");
  } catch (err) {
    showToast("Erro a copiar link", "error");
  }
}

onMounted(() => {
  if (typeof navigator.share !== "undefined") {
    webShareAPISupported.value = true;
  } else {
    webShareAPISupported.value = false;
  }
});
</script>

<template>
  <toast
    :type="type"
    :text="toastText"
    :showToast="show"
    @hideToast="hideToast"
  />
  <div>
    <p class="text-xl text-lightGrey">
      bem, espero que tenham gostado de ler a minha perspetiva tosca, é.
    </p>
    <p class="text-xl text-lightGrey">
      se acharem que o texto é digno de ser partilhado com outros seres humanos deixo
      aqui uns links para fazer essa partilha.
    </p>
    <p class="text-xl text-lightGrey">não sou muito das redes sociais, por isso recomendo sempre que copiem o link, é mais simples.</p>
    <div class="mt-4 flex flex-row flex-wrap gap-4">
      <button
        class="group border-b border-b-lightPurple p-1 transition-colors"
        @click="handleCopyPostLinkBtnClick"
      >
        <LinkIcon
          class="mr-2 inline fill-lightGrey group-hover:fill-lightBlue group-active:fill-lightBlue"
        />
        <span class="group-hover:active-lightBlue group-hover:text-lightBlue"
          >copiar link</span
        >
      </button>

      <button v-if="webShareAPISupported" @clcik="handleWebShare">
        <ShareIcon class="mr-2 inline h-4 w-4 fill-white" />
        <span>partilhar</span>
      </button>

      <template v-else>
        <button
          class="group border-b border-b-lightPurple p-1 transition-colors"
          @click="openSocialMediaWindow($event, twitterShareUrl)"
        >
          <TwitterIcon
            class="fill-lightGrey group-hover:fill-lightBlue group-active:fill-lightBlue"
          />
        </button>
        <button
          class="group border-b border-b-lightPurple p-1 transition-colors"
          @click="openSocialMediaWindow($event, whatsappShareUrl)"
        >
          <WhatsAppIcon
            class="fill-lightGrey group-hover:fill-lightBlue group-active:fill-lightBlue"
          />
        </button>
        <button
          class="group border-b border-b-lightPurple p-1 transition-colors"
          @click="openSocialMediaWindow($event, telegramShareUrl)"
        >
          <TelegramIcon
            class="fill-lightGrey group-hover:fill-lightBlue group-active:fill-lightBlue"
          />
        </button>
      </template>

      
    </div>
  </div>
</template>
