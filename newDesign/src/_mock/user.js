import { sample } from 'lodash';
import { Faker,ko } from '@faker-js/faker';

// ----------------------------------------------------------------------
const faker=new Faker({locale:[ko]});
export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: `${faker.date.birthdate().getMonth()}월 ${faker.date.birthdate().getDate()}일 ${faker.date.birthdate().getHours()}시 ${faker.date.birthdate().getMinutes()}분`,
  isVerified: faker.datatype.boolean(),
  status: sample(['네', '아니오']),
  role: sample([
    '식사 후 약 복용하셨나요?',
    '화장실 다녀오셨나요?',
    '잠은 잘 주무셨나요?',
    '컨디션은 괜찬으신가요?',
    '불편한 곳은 없으세요?',
    '아프신 곳은 없으신가요?',
    ]),
}));
