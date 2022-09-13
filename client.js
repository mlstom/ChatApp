import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '36tmxryt',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: "sk3oThVt4VfgLXo93r5VUhaSrA6lJ2jxgjx8kCSOIP6g0qEV9VF32y26OOwJSvxAZpojcNpbsOLwkvh6mF43VeWQaxCEXWmuANXq21pVIpgw55R7IZtCVpV74OSSOwRsl0VI5Onen88tQD9UxK50xPpaVBps4Xo9XhCqBNM603qAxsMLVTBu",
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);