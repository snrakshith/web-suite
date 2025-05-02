// k6 load test
// https://github.com/singhsanket143/k6-load-test

import http from 'k6/http';
import { sleep, check } from 'k6';

// export let options = {
//     // duration: '30s',
//     // vus: 50

//     stages: [
//         { duration: '30s', target: 50 }, // simulate ramp-up of traffic from 1 to 50 users over 30 seconds.
//         { duration: '1m', target: 100 }, // stay at 100 users for 1 minute
//         { duration: '30s', target: 0 }, // ramp-down to 0 users
//     ]
// }

// we want to setup spike test options
export let options = {
    stages: [
        { duration: '4s', target: 1000 }, // simulate ramp-up of traffic from 1 to 50 users over 30 seconds.
        { duration: '20s', target: 1000 }, // stay at 100 users for 1 minute
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2'], // 95% of requests should be below 200ms
    },
}


export default function() {
    let res = http.get('http://localhost:3000/ping');
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}