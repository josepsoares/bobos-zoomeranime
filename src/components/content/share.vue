<script lang="ts" setup>
import { onMounted, ref } from "vue";

/* 
import ShareIcon from "@icons/bx-share-alt.svg";
import LinkIcon from "@icons/bx-link.svg";
import TwitterIcon from "@icons/bxl-twitter.svg";
import WhatsAppIcon from "@icons/bxl-whatsapp.svg";
import TelegramIcon from "@icons/bxl-telegram.svg";
*/

import Icon from "@components/primitives/icon.vue";
import { isMobileDevice } from "@utils/helpers";

const { url, title, subjects } = defineProps<{
  url: string;
  title: string;
  subjects: string;
}>();

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
    // toast.success("Here is your toast.");
  } catch (err) {
    // toast.error("Here is your toast.");
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
  <Box className="share-post">
    <Text>
      i guess that's it, if you kinda enjoyed the ride and want to let other
      humans feel the same you can use the buttons bellow of those social medias
      everyone knows{' '}
    </Text>
    <Box>
      <button v-if="webShareAPISupported" @onClick="handleWebShare">
        <Icon name="" class="mr-2 inline h-4 w-4" />
        <span>partilhar</span>
      </button>

      <template v-else>
        <button @onClick="openSocialMediaWindow($event, twitterShareUrl)">
          <Icon name="" />
        </button>
        <button @onClick="openSocialMediaWindow($event, whatsappShareUrl)">
          <Icon name="" />
        </button>
        <button @onClick="openSocialMediaWindow($event, telegramShareUrl)">
          <Icon name="" />
        </button>
      </template>

      <button @onClick="handleCopyPostLinkBtnClick">
        <Icon name="" class="mr-2 inline h-4 w-4" />
        <span>copiar link</span>
      </button>
    </Box>
    <Toaster />
  </Box>
</template>
