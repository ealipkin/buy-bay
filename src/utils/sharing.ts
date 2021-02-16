export const sharingUtils = {
  tgLink: (url, text) => `https://t.me/share/url?url=${url}&text=${text}`,
  whatsapp: (url, text) => `https://api.whatsapp.com/send?phone=&text="${text} - ${url}"`,
  viber: (url, text) => `viber://forward?text="${text} - ${url}"`,
  vk: (url, text) => `https://vk.com/share.php?url=${url}`,
  fb: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  ok: (url, text, imageUrl) => `https://connect.ok.ru/offer?url=${url}&title=${text}&imageUrl=${imageUrl}`,
};
