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
    imageUrl: '/images/family_birthday.jpg',
    date: '2021-05-15',
    location: '自宅',
    people: '家族',
    event: '誕生日',
    impression: '祖母が手作りの特製ケーキを焼いてくれた',
    story: '2021年、自宅で家族と一緒に誕生日を祝いました。祖母が私の好きな味の特製ケーキを焼いてくれたことが特に印象に残っています。家族全員で食卓を囲み、笑顔で過ごした時間はかけがえのないものでした。この瞬間はあなたにとって特別な思い出です。',
    year: '2021',
  },
  {
    id: '2',
    imageUrl: '/images/mt_fuji_trip.jpg',
    date: '2019-08-10',
    location: '旅行先',
    people: '友人',
    event: '休日',
    impression: '初めて富士山に登頂し、ご来光を見た',
    story: '2019年、旅行先で親友と休日を過ごしました。夜中から登山を始め、初めて富士山に登頂してご来光を見たことが特に印象に残っています。苦労して登った後に見た朝日は言葉では表現できないほど美しく、あなたの人生を変えるような体験でした。この瞬間はあなたにとって特別な思い出です。',
    year: '2019',
  },
  {
    id: '3',
    imageUrl: '/images/christmas_party.jpg',
    date: '2015-12-25',
    location: '友人の家',
    people: '友人',
    event: '特別なイベント',
    impression: '友人全員でサプライズプレゼント交換をした',
    story: '2015年、親友の家で友人たちと特別なクリスマスパーティーに参加しました。全員でサプライズプレゼント交換をしたことが特に印象に残っています。あなたが用意したプレゼントは、受け取った友人を感動させ、その夜は笑顔と温かさに包まれていました。この瞬間はあなたにとって特別な思い出です。',
    year: '2015',
  },
  {
    id: '4',
    imageUrl: '/images/graduation_day.jpg',
    date: '2010-03-20',
    location: '学校',
    people: '同僚',
    event: '特別なイベント',
    impression: '卒業式での感動的なスピーチ',
    story: '2010年、学校で同級生たちと卒業式に参加しました。クラスを代表してあなたがスピーチを行い、多くの人が涙を流したことが特に印象に残っています。数年間共に過ごした仲間との別れを惜しみながらも、新たな一歩を踏み出す決意に満ちていました。この瞬間はあなたにとって特別な思い出です。',
    year: '2010',
  },
]; 