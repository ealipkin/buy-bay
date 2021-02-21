import { IShareData } from '@/models/models';
import { declOfNum } from '@/utils/common';

const getText = (shareData: IShareData) => `Смотри! Можно всего за ${shareData.groupPrice} ₽ купить ${shareData.productName}. ${declOfNum(shareData.leftUsers, ['Нужен', 'Нужно', 'Нужны'])} ещё ${shareData.leftUsers} человек для покупки!"`;

export const sharingUtils = {
  tgLink: (shareData: IShareData) => `https://t.me/share/url?url=${shareData.link}&text=${getText(shareData)}`,
  whatsapp: (shareData: IShareData) => `https://api.whatsapp.com/send?phone=&text="${getText(shareData)} - ${shareData.link}"`,
  viber: (shareData: IShareData) => `viber://forward?text="${getText(shareData)} - ${shareData.link}"`,
  vk: (shareData: IShareData) => `https://vk.com/share.php?url=${shareData.link}&comment=${getText(shareData)}&image=${shareData.image}`,
  fb: (shareData: IShareData) => `https://www.facebook.com/sharer/sharer.php?u=${shareData.link}`,
  ok: (shareData: IShareData) => `https://connect.ok.ru/offer?url=${shareData.link}&title=${getText(shareData)}&imageUrl=${shareData.image}`,
};

export const createSharingLinks = (shareData: IShareData) => [
  {
    href: sharingUtils.tgLink(shareData),
    icon: 'socials/telegram.svg',
    type: 'telegram',
    title: 'Telegram',
  },
  {
    href: sharingUtils.whatsapp(shareData),
    icon: 'socials/whatsapp.svg',
    type: 'whatsapp',
    title: 'Whatsapp',
  },
  {
    href: sharingUtils.viber(shareData),
    icon: 'socials/viber.svg',
    type: 'viber',
    title: 'Viber',
  },

  {
    href: sharingUtils.vk(shareData),
    icon: 'socials/vk.svg',
    type: 'vk',
    title: 'VK',
  },
  {
    href: sharingUtils.fb(shareData),
    icon: 'socials/facebook.svg',
    type: 'facebook',
    title: 'Facebook',
  },
  {
    href: sharingUtils.ok(shareData),
    icon: 'socials/odnoklassniki.svg',
    type: 'ok',
    title: 'OK',
  }];
