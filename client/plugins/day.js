import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default ({ app }, inject) => {
  inject('dayjs', string => dayjs(string));
};
