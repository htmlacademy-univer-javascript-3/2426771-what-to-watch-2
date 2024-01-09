export const getDateString = (postDate: Date) =>
  `${postDate.toLocaleString('eng', {month: 'long',})} ${postDate.getDate()}, ${postDate.getFullYear()}`;
