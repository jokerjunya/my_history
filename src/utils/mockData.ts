import { Question, PhotoMemory } from '../types';

export const questionsList: Question[] = [
  {
    id: 'location',
    text: 'この写真はどこで撮影されましたか？',
    type: 'multiple-choice',
    options: ['家', '友人の家', '学校', '旅行先', 'その他'],
  },
  {
    id: 'people',
    text: 'この写真に写っているのはどなたですか？',
    type: 'multiple-choice',
    options: ['家族', '友人', '同僚', '見知らぬ人', 'その他'],
  },
  {
    id: 'event',
    text: 'このとき、どんなことをしていましたか？',
    type: 'multiple-choice',
    options: ['誕生日', '休日', '日常のひとこま', '特別なイベント', 'その他'],
  },
  {
    id: 'impression',
    text: 'この写真を見て、一番印象に残っていることは何ですか？',
    type: 'multiple-choice',
    options: ['楽しかった', '驚いた', '感動した', '特別な意味がある', 'その他'],
  },
];

export const sampleMemories: PhotoMemory[] = [
  {
    id: '1',
    imageUrl: '/images/placeholder1.jpg',
    date: '2021-05-15',
    location: '自宅',
    people: '家族',
    event: '誕生日',
    impression: '祖母が私の好きなケーキを焼いてくれた',
    story: '2021年、自宅で家族と一緒に誕生日を祝いました。祖母が私の好きなケーキを焼いてくれたことが特に印象に残っています。この瞬間はあなたにとって特別な思い出です。',
    year: '2021',
  },
  {
    id: '2',
    imageUrl: '/images/placeholder2.jpg',
    date: '2019-08-10',
    location: '旅行先',
    people: '友人',
    event: '休日',
    impression: '初めて富士山に登った',
    story: '2019年、旅行先で友人と休日を過ごしました。初めて富士山に登ったことが特に印象に残っています。この瞬間はあなたにとって特別な思い出です。',
    year: '2019',
  },
  {
    id: '3',
    imageUrl: '/images/placeholder3.jpg',
    date: '2015-12-25',
    location: '友人の家',
    people: '友人',
    event: '特別なイベント',
    impression: '一生の思い出になるクリスマスパーティー',
    story: '2015年、友人の家で友人と特別なイベントに参加しました。一生の思い出になるクリスマスパーティーが特に印象に残っています。この瞬間はあなたにとって特別な思い出です。',
    year: '2015',
  },
]; 