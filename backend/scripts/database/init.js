import { v4 } from 'uuid';
import { db } from './../index.js';

// Варианты нумерации вагонов
// с головы — отсчет следует вести с локомотива, первый вагон находится сразу за ним
// с хвоста — за локомотивом следует последний вагон, а первый находится в хвосте
(async () => {
    try {
        await db.connect();

        await db.get('station').insertMany([
            {
                _id: '8008f01b-3a81-4fd1-88d4-ae832e84eb53',
                name: 'Station I',
                platforms: [1, 2],
                address: 'Україна, Черкаси, вул. Крупської, 1',
                phones: [
                    { number: '39-92-09' },
                    { number: '63-87-87' },
                    { number: '63-87-87', name: 'Довідкове бюро' },
                    { number: '399-525', name: 'Групова квиткова каса' },
                    { number: '399-362', name: 'Старший квитковий касир' },
                    { number: '399-218', name: 'Багажне відділення' },
                ],
                phone_prefix: '(0472)',
                // Статус станции - открыта/закрыта(коронавирус)
            },
        ]);

        // https://eltablo.ru/files/foto/transport/rgb.jpg
        await db.get('scoreboard').insertMany([
            {
                _id: v4(),
                trainID: 'c6d7574a-06e8-4d44-895c-3c327919e70a',
                platform: 1,
                arrives: '12:15',
                departs: '12:35',
                numbering: 'head',
                _createdAt: new Date().getTime(),
            },
            {
                _id: v4(),
                trainID: 'f90d0f1a-e248-4027-a3c3-d5359bdb9a45',
                platform: 1,
                arrives: '13:55',
                departs: '14:45',
                numbering: 'tail',
                _createdAt: new Date().getTime(),
            },
            {
                _id: v4(),
                trainID: 'c613a5ec-eda3-4029-b1af-410fd51f7d88',
                platform: 2,
                arrives: '12:45',
                departs: '13:05',
                numbering: 'head',
                _createdAt: new Date().getTime(),
            },
        ]);
        await db.get('scoreboard').createIndex({ _createdAt: 1 }, { expireAfterSeconds: 86_400 }); // 60s * 60m * 24h

        /* 61 — пассажирские вагоны
        62 — электропоезда, электросекции, их вагоны и тележки
        63 — дизель-поезда, дизель-электропоезда, их вагоны и тележки
        65 — вагоны-электростанции для пассажирских поездов
        68 — тележки пассажирских вагонов
        71 — трамвайные вагоны
        81 — вагоны метрополитена */
        // https://ru.wikipedia.org/wiki/%D0%95%D0%B4%D0%B8%D0%BD%D0%B0%D1%8F_%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9_%D0%B2%D0%B0%D0%B3%D0%BE%D0%BD%D0%BE%D0%B2

        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354943/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354951/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354959/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354967/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354975/
        // https://www.uz.gov.ua/passengers/scheme_of_passenger_car/354920/
        await db.get('trains').insertMany([
            {
                _id: 'c6d7574a-06e8-4d44-895c-3c327919e70a',
                model: '61-779Д',
                number: '8/7',
                destination: { from: 'Odessa', to: 'Kyiv' },
            },
            {
                _id: 'f90d0f1a-e248-4027-a3c3-d5359bdb9a45',
                model: 'Інтерсіті+ - ЕКр-1 ("Тарпан")',
                number: '53/54',
                destination: { from: 'Lviv', to: 'Kyiv' },
            },
            {
                _id: 'c613a5ec-eda3-4029-b1af-410fd51f7d88',
                model: '61-4194',
                number: '125/126',
                destination: { from: 'Dnipro', to: 'Kyiv' },
            },
        ]);
    } catch (error) {
        throw error;
    } finally {
        await db.disconnect();
    }
})();
