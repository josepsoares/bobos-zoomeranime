import { MouseEvent, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import toast, { Toaster } from 'react-hot-toast'

import Box from '@components/primitives/box'
import Text from '@components/primitives/text'

// icons
import ShareIcon from '@icons/bx-share-alt.svg'
import LinkIcon from '@icons/bx-link.svg'
import TwitterIcon from '@icons/bxl-twitter.svg'
import WhatsAppIcon from '@icons/bxl-whatsapp.svg'
import TelegramIcon from '@icons/bxl-telegram.svg'

// types
import type { NextComponentType, NextPageContext } from 'next'

interface Props {
  title: string
  url: string
  subjects: string
}

const Share: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  const { url, title, subjects } = props
  const [webShareAPISupported, setWebShareAPISupported] = useState(false)

  const message = 'eu li um post porreiro no blog do bobo'
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedMessage = encodeURIComponent(message)
  const encodedHastags = encodeURIComponent(subjects)
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}&hashtags=${encodedHastags}`
  const whatsappShareUrl = isMobile
    ? `https://api.whatsapp.com/send?url=${encodedUrl}&title=${encodedTitle}`
    : `https://wa.me/?text=${encodeURIComponent(`${message} - ${url}`)}`
  const telegramShareUrl = `https://telegram.me/share/url?url=${encodedUrl}&title=${encodedTitle}`

  function openSocialMediaWindow(
    e: MouseEvent<HTMLButtonElement>,
    url: string
  ) {
    e.preventDefault()

    const w = 600
    const h = 400
    const x = (screen.width - w) / 2
    const y = (screen.height - h) / 2
    const features = `width=${w},height=${h},left=${x},top=${y},centerscreen='yes'`

    window.open(url, '_blank', features)
  }

  async function handleWebShare() {
    try {
      if (webShareAPISupported) {
        navigator.share({
          title: props.title,
          text: `Shared from asd`,
          url: props.url
        })
      }
    } catch (error) {
      setWebShareAPISupported(false)
    }
  }

  async function handleCopyPostLinkBtnClick() {
    try {
      await navigator.clipboard.writeText(props.url)
      toast.success('Here is your toast.')
    } catch (err) {
      toast.error('Here is your toast.')
    }
  }

  useEffect(() => {
    if (typeof navigator.share !== 'undefined') {
      setWebShareAPISupported(true)
    } else {
      setWebShareAPISupported(false)
    }
  }, [])

  return (
    <Box className="share-post">
      <Text>
        i guess that's it, if you kinda enjoyed the ride and want to let other
        humans feel the same you can use the buttons bellow of those social
        medias everyone knows{' '}
      </Text>
      <Box>
        {webShareAPISupported ? (
          <>
            <button onClick={handleWebShare}>
              <ShareIcon class="inline w-4 h-4 mr-2" />
              <span>partilhar</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={e => openSocialMediaWindow(e, twitterShareUrl)}>
              <TwitterIcon />
            </button>
            <button onClick={e => openSocialMediaWindow(e, whatsappShareUrl)}>
              <WhatsAppIcon />
            </button>
            <button onClick={e => openSocialMediaWindow(e, telegramShareUrl)}>
              <TelegramIcon />
            </button>
          </>
        )}

        <button onClick={handleCopyPostLinkBtnClick}>
          <LinkIcon class="inline w-4 h-4 mr-2" />
          <span>copiar link</span>
        </button>
      </Box>
      <Toaster />
    </Box>
  )
}

export default Share
