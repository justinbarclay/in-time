var Flux = require('../biff');

// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
var _staff = [{
    name: "Josh Brolin",
    hours: 31,
    timesheets: [{
        "timesheet_id": "29cc174e-1934-4d55-9700-b85cc3ce0988",
        "engagement": "624872",
        "startDate": "2015-10-22T03:57:47.071Z",
        "endDate": "2015-11-05T03:57:47.071Z",
        "entries": [{
            "row_id": "5a05fe22-1a4f-48a9-b663-673301d9f7a6",
            "service": "Phone Call",
            "duration": 6.5,
            "date": "2015-11-04T10:55:48.324Z"
        }, {
            "row_id": "8d081e47-19bf-4856-83ab-204f16a7b579",
            "service": "Critical Incidence",
            "duration": 9.75,
            "date": "2015-11-02T06:23:51.252Z"
        }]
    }, {
        "timesheet_id": "8589de17-ffb3-4362-b188-7f70a2d6b0ff",
        "engagement": "687333",
        "startDate": "2015-12-29T03:33:35.613Z",
        "endDate": "2016-01-12T03:33:35.613Z",
        "entries": [{
            "row_id": "259dea8f-954f-470c-97d9-3db4aeb68e11",
            "service": "Administrative",
            "duration": 10.5,
            "date": "2015-12-30T01:09:49.001Z"
        }, {
            "row_id": "ec38814d-875b-4f9e-b904-a511b0c12bc7",
            "service": "Phone Call",
            "duration": 11.5,
            "date": "2016-01-01T06:30:11.383Z"
        }, {
            "row_id": "1ae90dc9-bb12-44ae-be7e-02f0d9eaa09a",
            "service": "Phone Call",
            "duration": 5.5,
            "date": "2016-01-02T19:38:09.696Z"
        }]
    }, {
        "timesheet_id": "76005a23-f1d6-4e13-9f9c-594197872316",
        "engagement": "241142",
        "startDate": "2015-07-16T04:15:23.751Z",
        "endDate": "2015-07-30T04:15:23.751Z",
        "entries": [{
            "row_id": "7bcfe651-7c69-4461-98c9-aef5a62513ba",
            "service": "Case Consult",
            "duration": 12,
            "date": "2015-07-30T00:17:36.954Z"
        }, {
            "row_id": "e5459f14-283b-4e7d-bcd0-d978eec6dba2",
            "service": "Pick up",
            "duration": 5,
            "date": "2015-07-26T19:29:03.866Z"
        }, {
            "row_id": "53cf24a5-8a0a-4535-9da4-f69360a1e7e0",
            "service": "Critical Incidence",
            "duration": 4,
            "date": "2015-07-22T22:42:10.596Z"
        }, {
            "row_id": "0b450732-06e2-40e8-a6d0-53f2d029d834",
            "service": "timesheets",
            "duration": 5.75,
            "date": "2015-07-20T08:25:27.761Z"
        }]
    }, {
        "timesheet_id": "44b2dd0c-3771-4366-b925-a5ce329f70ef",
        "engagement": "860751",
        "startDate": "2015-12-17T03:24:16.598Z",
        "endDate": "2015-12-31T03:24:16.598Z",
        "entries": [{
            "row_id": "8ef66103-7158-4719-acbe-e8a15cd80844",
            "service": "Pick up",
            "duration": 11.75,
            "date": "2015-12-23T15:22:08.493Z"
        }, {
            "row_id": "2509f342-ce4f-4674-99e7-84a1456e5b1c",
            "service": "Phone Call",
            "duration": 4.25,
            "date": "2015-12-21T21:45:04.799Z"
        }, {
            "row_id": "248a7e7d-dc6b-4bea-b918-85a5fb8121f1",
            "service": "Case Consult",
            "duration": 6.25,
            "date": "2015-12-26T21:39:41.914Z"
        }, {
            "row_id": "2e073d22-0755-492e-9f1a-0ab1b9f058dc",
            "service": "Administrative",
            "duration": 0.5,
            "date": "2015-12-23T03:14:04.486Z"
        }, {
            "row_id": "6cdfc4cd-f30d-4903-9ff7-0e179b996783",
            "service": "Case Consult",
            "duration": 7,
            "date": "2015-12-18T21:42:47.222Z"
        }]
    }, {
        "timesheet_id": "fb3fc6ef-d13e-4904-a3cd-cc04b5f621dd",
        "engagement": "426315",
        "startDate": "2015-03-30T03:27:07.695Z",
        "endDate": "2015-04-13T03:27:07.695Z",
        "entries": [{
            "row_id": "c4658b9c-0ab6-4f29-a3a9-1cbf57ed08a4",
            "service": "Critical Incidence",
            "duration": 10.5,
            "date": "2015-04-11T11:48:22.503Z"
        }, {
            "row_id": "a6d8efe0-2329-4509-b7d9-7fa385f11603",
            "service": "Administrative",
            "duration": 12,
            "date": "2015-04-03T23:29:20.014Z"
        }, {
            "row_id": "87a6ea0d-b61b-4576-a909-d1154e2ce9f4",
            "service": "Administrative",
            "duration": 9,
            "date": "2015-04-03T00:38:23.607Z"
        }, {
            "row_id": "7054244f-aabf-4a99-90d0-2a83e4fec4fa",
            "service": "Administrative",
            "duration": 8.5,
            "date": "2015-04-12T18:12:32.264Z"
        }]
    }, {
        "timesheet_id": "8b097781-657f-48e7-b88c-76e70efb1c6e",
        "engagement": "626431",
        "startDate": "2015-12-05T09:16:10.654Z",
        "endDate": "2015-12-19T09:16:10.654Z",
        "entries": [{
            "row_id": "6176d239-6fbb-4c06-931d-955284912c68",
            "service": "Case Consult",
            "duration": 9.75,
            "date": "2015-12-07T10:48:19.851Z"
        }]
    }, {
        "timesheet_id": "943a6e22-6476-46f2-9e6c-467da7854250",
        "engagement": "618745",
        "startDate": "2015-11-28T16:53:59.485Z",
        "endDate": "2015-12-12T16:53:59.485Z",
        "entries": [{
            "row_id": "14a96e89-d396-4a18-8239-b03146490e10",
            "service": "Administrative",
            "duration": 9.75,
            "date": "2015-12-05T08:35:26.449Z"
        }, {
            "row_id": "c633f32c-a3e3-4f9f-b58b-6d608dfd03d0",
            "service": "Case Consult",
            "duration": 11,
            "date": "2015-12-04T23:49:08.166Z"
        }, {
            "row_id": "80b779a2-c1b3-40ee-8015-a58c5e4b2768",
            "service": "Administrative",
            "duration": 3,
            "date": "2015-12-05T10:41:55.139Z"
        }]
    }, {
        "timesheet_id": "0d2e36f9-8f10-4280-8b0e-14ca8e97c349",
        "engagement": "561312",
        "startDate": "2015-12-12T22:54:37.935Z",
        "endDate": "2015-12-26T22:54:37.935Z",
        "entries": [{
            "row_id": "2282709b-9a4a-493d-8a7e-a02423eed2ec",
            "service": "Administrative",
            "duration": 2,
            "date": "2015-12-13T11:30:34.690Z"
        }, {
            "row_id": "d971a9dc-6ff7-4031-8fac-3e8f50aa96d9",
            "service": "Case Consult",
            "duration": 6.25,
            "date": "2015-12-23T20:21:32.238Z"
        }, {
            "row_id": "f49986e8-4594-4e16-bc3c-f3c2cb52bf1d",
            "service": "timesheets",
            "duration": 12.5,
            "date": "2015-12-18T03:42:59.408Z"
        }, {
            "row_id": "42ad7bdf-ba8e-4899-a9de-8d51a3c01678",
            "service": "timesheets",
            "duration": 11.75,
            "date": "2015-12-21T06:29:41.780Z"
        }, {
            "row_id": "c2449382-506e-4186-8bee-1e552d912ac7",
            "service": "Pick up",
            "duration": 3.5,
            "date": "2015-12-14T19:42:28.777Z"
        }, {
            "row_id": "171ad266-9e33-4971-8a5a-c41d07eaeb3c",
            "service": "Pick up",
            "duration": 5.5,
            "date": "2015-12-18T11:14:48.728Z"
        }]
    }, {
        "timesheet_id": "92cab4e3-761a-4bac-af47-d87ede9cb72b",
        "engagement": "852121",
        "startDate": "2015-04-09T12:49:50.834Z",
        "endDate": "2015-04-23T12:49:50.834Z",
        "entries": [{
            "row_id": "eeba971d-e274-4cb3-93e0-f1b3535acdfb",
            "service": "Administrative",
            "duration": 2.5,
            "date": "2015-04-09T20:20:15.054Z"
        }, {
            "row_id": "c79ea0ac-178a-4444-aa34-1111911fc5f2",
            "service": "Critical Incidence",
            "duration": 2.75,
            "date": "2015-04-18T18:41:11.555Z"
        }, {
            "row_id": "a2718f61-50d3-4a3e-845c-7d4a3e3fdc9e",
            "service": "Administrative",
            "duration": 12.25,
            "date": "2015-04-20T06:13:54.377Z"
        }, {
            "row_id": "3ea68ffb-3d11-4786-8413-950887f4f1cb",
            "service": "Critical Incidence",
            "duration": 3.75,
            "date": "2015-04-16T14:03:35.759Z"
        }, {
            "row_id": "4139e5ef-9db9-4c77-90e6-4d55fb7a2305",
            "service": "Phone Call",
            "duration": 10,
            "date": "2015-04-13T00:52:17.204Z"
        }, {
            "row_id": "011ca899-cbe7-4841-b7c1-198c93a2e0d4",
            "service": "timesheets",
            "duration": 3.25,
            "date": "2015-04-11T03:27:59.595Z"
        }]
    }, {
        "timesheet_id": "5b5a72e2-d9cb-4000-8f4a-2fe804173361",
        "engagement": "165535",
        "startDate": "2015-11-25T16:39:26.414Z",
        "endDate": "2015-12-09T16:39:26.414Z",
        "entries": [{
            "row_id": "3b575a61-e4d0-4687-baa4-fd54e31926cb",
            "service": "timesheets",
            "duration": 11.75,
            "date": "2015-12-05T21:35:36.410Z"
        }, {
            "row_id": "6b3025d4-8d80-4305-90a6-2afb896e63f5",
            "service": "Case Consult",
            "duration": 9.75,
            "date": "2015-12-04T02:12:33.469Z"
        }, {
            "row_id": "b2a6bc2d-2c8d-48cc-bb9a-3d79d88cb096",
            "service": "Administrative",
            "duration": 3,
            "date": "2015-11-29T03:55:57.852Z"
        }, {
            "row_id": "0688634e-4cff-497e-9d8b-6068cc5a1e67",
            "service": "Case Consult",
            "duration": 0.5,
            "date": "2015-11-28T08:58:19.749Z"
        }]
    }]
}, {
    name: "Sally Sarandon",
    hours: 36.5,
    timesheets: [{
        "timesheet_id": "bf5e62bc-4ed7-40d2-a68b-2dbdeeb13e0d",
        "engagement": "032545",
        "startDate": "2015-04-16T00:18:47.053Z",
        "endDate": "2015-04-30T00:18:47.053Z",
        "entries": [{
            "row_id": "3682b39f-d607-4617-a7a1-2b1994061890",
            "service": "Administrative",
            "duration": 7,
            "date": "2015-04-20T01:24:55.168Z"
        }, {
            "row_id": "19ab1c2d-9529-4b13-900a-bc784830f655",
            "service": "Pick up",
            "duration": 9.5,
            "date": "2015-04-17T08:25:04.924Z"
        }, {
            "row_id": "f8e97766-0e6e-483c-b1de-d3fb9bbec356",
            "service": "Administrative",
            "duration": 9.75,
            "date": "2015-04-25T05:10:51.744Z"
        }, {
            "row_id": "da6f16bc-c430-42cf-b704-630b747a3915",
            "service": "Pick up",
            "duration": 9,
            "date": "2015-04-17T03:58:01.432Z"
        }, {
            "row_id": "f1bcd468-9bf1-43c1-8dd8-c6ce94129944",
            "service": "Phone Call",
            "duration": 2,
            "date": "2015-04-26T20:04:34.192Z"
        }]
    }, {
        "timesheet_id": "0f1464c0-d4a6-4df3-8d58-e65ecee96ef7",
        "engagement": "201172",
        "startDate": "2015-12-22T14:17:29.237Z",
        "endDate": "2016-01-05T14:17:29.237Z",
        "entries": [{
            "row_id": "9726738c-51d2-4f55-a488-a64a0bf578ab",
            "service": "Administrative",
            "duration": 10,
            "date": "2015-12-23T08:15:30.824Z"
        }, {
            "row_id": "f4f58d09-3d8d-405d-bc37-d56da54c7f39",
            "service": "Phone Call",
            "duration": 6.25,
            "date": "2015-12-23T02:48:01.876Z"
        }]
    }, {
        "timesheet_id": "5cbd13a4-a72d-49d7-854a-3d78912b66f4",
        "engagement": "860268",
        "startDate": "2015-03-01T14:37:28.753Z",
        "endDate": "2015-03-15T14:37:28.753Z",
        "entries": [{
            "row_id": "3921bc53-45aa-4eca-9ab7-cb5ab2a699b3",
            "service": "Case Consult",
            "duration": 0.5,
            "date": "2015-03-11T13:46:30.653Z"
        }, {
            "row_id": "bf7f17cc-331c-4b43-9593-9d4a5ca77fd1",
            "service": "Phone Call",
            "duration": 4,
            "date": "2015-03-11T07:07:51.367Z"
        }, {
            "row_id": "544f8555-95bf-4063-bef5-9fc264a0b700",
            "service": "Phone Call",
            "duration": 4.25,
            "date": "2015-03-08T04:55:07.682Z"
        }]
    }, {
        "timesheet_id": "89e190ca-0e9a-4c62-b75a-9172c13f5ef4",
        "engagement": "141613",
        "startDate": "2015-08-25T00:10:03.230Z",
        "endDate": "2015-09-08T00:10:03.230Z",
        "entries": [{
            "row_id": "b6bb726d-62e3-453c-871c-49bcbd5d021c",
            "service": "timesheets",
            "duration": 8,
            "date": "2015-09-07T05:57:47.557Z"
        }, {
            "row_id": "0b0379b2-a439-487a-bdb4-9e8c82f15f3a",
            "service": "Pick up",
            "duration": 7.75,
            "date": "2015-09-04T14:31:42.062Z"
        }, {
            "row_id": "b7a3ad96-ea67-40dd-9a2c-1ab4a35c51be",
            "service": "Pick up",
            "duration": 2.5,
            "date": "2015-09-05T10:50:08.635Z"
        }, {
            "row_id": "f9b40c24-7e2d-4153-94eb-67715ddc745b",
            "service": "timesheets",
            "duration": 3,
            "date": "2015-09-02T16:53:42.589Z"
        }]
    }, {
        "timesheet_id": "24a9c0b3-4cfc-4fcf-8664-de7244b5d06c",
        "engagement": "734118",
        "startDate": "2015-10-25T12:54:22.129Z",
        "endDate": "2015-11-08T12:54:22.129Z",
        "entries": [{
            "row_id": "a905abf7-1fb2-4300-ad71-ea5b9f221486",
            "service": "Case Consult",
            "duration": 4,
            "date": "2015-10-31T02:12:41.359Z"
        }]
    }, {
        "timesheet_id": "4e33f006-c7fb-416d-b517-d5abe679a257",
        "engagement": "470107",
        "startDate": "2015-10-12T23:14:46.330Z",
        "endDate": "2015-10-26T23:14:46.330Z",
        "entries": [{
            "row_id": "f23b9cb5-5652-4001-ad9c-793b4927d8fb",
            "service": "Pick up",
            "duration": 2,
            "date": "2015-10-24T22:11:18.896Z"
        }, {
            "row_id": "74f96853-ec91-47f8-a69f-076894f90916",
            "service": "Case Consult",
            "duration": 8,
            "date": "2015-10-23T14:41:45.128Z"
        }, {
            "row_id": "1e4dcb81-703c-45c4-91e8-b49cac4a2a15",
            "service": "Administrative",
            "duration": 2.25,
            "date": "2015-10-18T17:20:04.304Z"
        }, {
            "row_id": "4e5f22df-eb7f-4969-8e2c-d362115dda5a",
            "service": "Case Consult",
            "duration": 9.5,
            "date": "2015-10-25T05:42:29.201Z"
        }]
    }, {
        "timesheet_id": "dac27a82-1cbd-489b-94ff-e7f968e6a55a",
        "engagement": "077402",
        "startDate": "2015-02-22T03:14:25.410Z",
        "endDate": "2015-03-08T03:14:25.410Z",
        "entries": [{
            "row_id": "74bf13b7-8597-43b7-b049-af75dd262450",
            "service": "Phone Call",
            "duration": 0.5,
            "date": "2015-02-28T22:57:04.728Z"
        }, {
            "row_id": "987e091b-a7b2-486e-86ff-0d7b6face807",
            "service": "timesheets",
            "duration": 5.25,
            "date": "2015-02-24T06:50:17.204Z"
        }, {
            "row_id": "81656556-9822-4b31-8489-af7fd4b1ae5b",
            "service": "Critical Incidence",
            "duration": 3,
            "date": "2015-03-01T20:04:40.620Z"
        }, {
            "row_id": "25718a89-be1d-4a86-8c57-90fdcdf3f8c6",
            "service": "Pick up",
            "duration": 11.25,
            "date": "2015-02-26T17:33:55.892Z"
        }]
    }, {
        "timesheet_id": "72571891-1a0a-4946-93c9-223f56cb9362",
        "engagement": "268646",
        "startDate": "2015-03-28T21:33:08.562Z",
        "endDate": "2015-04-11T21:33:08.562Z",
        "entries": [{
            "row_id": "d239507b-b84b-45ff-9cf4-4a60a2aee39f",
            "service": "timesheets",
            "duration": 9.25,
            "date": "2015-04-08T02:47:19.632Z"
        }, {
            "row_id": "2809470a-fbc0-48c7-8854-325f2d89ec99",
            "service": "Pick up",
            "duration": 0.25,
            "date": "2015-04-09T01:59:31.159Z"
        }, {
            "row_id": "83bc4c33-2526-4eb4-8512-c10be7378257",
            "service": "Administrative",
            "duration": 4.25,
            "date": "2015-03-31T11:23:55.750Z"
        }, {
            "row_id": "a6303892-64ea-460b-9d31-cf85fa483441",
            "service": "timesheets",
            "duration": 11,
            "date": "2015-04-02T07:42:02.542Z"
        }, {
            "row_id": "ebba1f5d-6303-4bb9-bece-3f336b3d4dde",
            "service": "timesheets",
            "duration": 4.25,
            "date": "2015-04-05T06:23:42.425Z"
        }]
    }, {
        "timesheet_id": "a54b5414-8d8a-46e4-86c0-2e47f95bdb55",
        "engagement": "382310",
        "startDate": "2015-09-15T22:58:11.696Z",
        "endDate": "2015-09-29T22:58:11.696Z",
        "entries": [{
            "row_id": "d0b20e13-616c-482a-b049-f24d085baaee",
            "service": "Pick up",
            "duration": 12.25,
            "date": "2015-09-20T08:56:32.094Z"
        }, {
            "row_id": "ae89a789-8030-4cc4-935f-a34893cd79c1",
            "service": "Administrative",
            "duration": 13,
            "date": "2015-09-24T06:04:25.507Z"
        }]
    }, {
        "timesheet_id": "621dff7c-0724-47d5-84ea-4c3610b5db26",
        "engagement": "130006",
        "startDate": "2015-04-21T14:06:00.956Z",
        "endDate": "2015-05-05T14:06:00.956Z",
        "entries": [{
            "row_id": "be60ebe2-fd46-4733-99ee-1d66203a0af6",
            "service": "Case Consult",
            "duration": 4,
            "date": "2015-04-28T10:22:35.101Z"
        }]
    }]
}, {
    name: "Emily Buffington",
    hours: 40,
    timesheets: [{
        "timesheet_id": "4550e731-c019-45c7-9fcc-e807e8f7197a",
        "engagement": "535601",
        "startDate": "2015-06-20T05:34:35.291Z",
        "endDate": "2015-07-04T05:34:35.291Z",
        "entries": [{
            "row_id": "ff95ede1-8394-4cac-8eda-d9164ac5956e",
            "service": "Administrative",
            "duration": 3.25,
            "date": "2015-06-28T01:50:27.538Z"
        }, {
            "row_id": "6f7b2ae6-451d-4f69-9270-5a50f1d8de95",
            "service": "Critical Incidence",
            "duration": 8.5,
            "date": "2015-07-01T19:40:28.588Z"
        }]
    }, {
        "timesheet_id": "64a6e74f-f109-43f4-8f2b-bca5834e34d4",
        "engagement": "430402",
        "startDate": "2015-08-28T20:41:06.554Z",
        "endDate": "2015-09-11T20:41:06.554Z",
        "entries": [{
            "row_id": "f97a1c7b-e2ea-4e65-918f-b39bdbee696c",
            "service": "timesheets",
            "duration": 1.25,
            "date": "2015-09-11T20:12:17.634Z"
        }, {
            "row_id": "d3483e2c-67f6-4520-b0e2-4a0dad2d9761",
            "service": "Case Consult",
            "duration": 11.75,
            "date": "2015-09-07T06:52:20.790Z"
        }, {
            "row_id": "9c81ac8a-92a5-4cb7-89d5-0dbd95f567d4",
            "service": "Critical Incidence",
            "duration": 1,
            "date": "2015-08-31T01:52:21.028Z"
        }]
    }, {
        "timesheet_id": "e2ac1e5e-a0b6-4808-abe2-3518e6d0a10e",
        "engagement": "243807",
        "startDate": "2015-09-05T13:48:54.606Z",
        "endDate": "2015-09-19T13:48:54.606Z",
        "entries": [{
            "row_id": "c0cb18dd-d6f6-4a5c-b851-e4a2e80dd7f8",
            "service": "Administrative",
            "duration": 10.5,
            "date": "2015-09-07T21:19:59.861Z"
        }, {
            "row_id": "0ecdc4e9-f607-49d2-96a6-51abbdca960d",
            "service": "Critical Incidence",
            "duration": 11.75,
            "date": "2015-09-09T19:14:43.584Z"
        }, {
            "row_id": "7742e04f-e2d0-46ae-b76a-8afc1810cfc9",
            "service": "Critical Incidence",
            "duration": 6,
            "date": "2015-09-11T11:08:26.639Z"
        }, {
            "row_id": "158044d4-3126-42b0-ab0a-96b82c3f73d3",
            "service": "Phone Call",
            "duration": 11,
            "date": "2015-09-14T12:08:12.939Z"
        }, {
            "row_id": "7a0d9977-60da-480c-b609-bc470fd685a8",
            "service": "timesheets",
            "duration": 11,
            "date": "2015-09-08T10:47:06.940Z"
        }]
    }, {
        "timesheet_id": "81c6304b-2848-4851-a1c5-ca1fa01ab7f4",
        "engagement": "784166",
        "startDate": "2015-12-17T22:38:10.215Z",
        "endDate": "2015-12-31T22:38:10.215Z",
        "entries": [{
            "row_id": "2f3e9af1-6dd1-44af-8fbd-741adfa49c9b",
            "service": "Critical Incidence",
            "duration": 7.25,
            "date": "2015-12-21T12:23:18.051Z"
        }, {
            "row_id": "57b82c70-8f45-42c2-ad2a-37b2b606a4ca",
            "service": "Pick up",
            "duration": 4.75,
            "date": "2015-12-25T05:19:57.154Z"
        }, {
            "row_id": "2024bfe8-e9a4-463c-8b67-84af92b71731",
            "service": "Pick up",
            "duration": 7.25,
            "date": "2015-12-28T22:51:40.713Z"
        }, {
            "row_id": "ce1e37c3-9313-4c4d-98bf-99dbdc529d0c",
            "service": "Case Consult",
            "duration": 8.25,
            "date": "2015-12-26T04:40:46.477Z"
        }]
    }, {
        "timesheet_id": "002584b4-1498-4b1a-9225-e80be229009f",
        "engagement": "643377",
        "startDate": "2015-04-04T17:41:17.987Z",
        "endDate": "2015-04-18T17:41:17.987Z",
        "entries": [{
            "row_id": "f2fa5254-6600-4405-b4db-1e5f7c8d12ec",
            "service": "Pick up",
            "duration": 1.25,
            "date": "2015-04-18T16:47:28.022Z"
        }, {
            "row_id": "69b8a08c-bc35-4f09-85fe-04d2eddebfc9",
            "service": "Critical Incidence",
            "duration": 6.75,
            "date": "2015-04-05T10:04:05.302Z"
        }, {
            "row_id": "84dbe5e5-1253-441b-84e7-8969cfcef104",
            "service": "timesheets",
            "duration": 4.75,
            "date": "2015-04-07T16:23:31.990Z"
        }, {
            "row_id": "3393a843-f4e3-4a75-ae94-0db4dcfa1272",
            "service": "Case Consult",
            "duration": 5.25,
            "date": "2015-04-15T09:06:01.854Z"
        }, {
            "row_id": "4ebd2612-9496-46ae-b7da-7d600049660a",
            "service": "Critical Incidence",
            "duration": 3.5,
            "date": "2015-04-10T11:01:38.506Z"
        }, {
            "row_id": "488bc49e-1b41-4c45-920c-fb86a7ec4e2f",
            "service": "Pick up",
            "duration": 4.5,
            "date": "2015-04-15T13:19:29.960Z"
        }]
    }, {
        "timesheet_id": "9d8e00aa-d430-409f-a1d7-cfd53c2bade9",
        "engagement": "612700",
        "startDate": "2015-10-18T18:00:34.781Z",
        "endDate": "2015-11-01T18:00:34.781Z",
        "entries": [{
            "row_id": "116b548f-1889-4a4e-8640-e0db72f7f243",
            "service": "Critical Incidence",
            "duration": 4.75,
            "date": "2015-10-29T08:09:52.612Z"
        }, {
            "row_id": "c0044690-3867-451f-a886-6f7401b2e843",
            "service": "Pick up",
            "duration": 7.25,
            "date": "2015-10-30T02:46:07.703Z"
        }, {
            "row_id": "7e3955fc-4d28-4b65-ba08-488aa44b6b63",
            "service": "timesheets",
            "duration": 7.75,
            "date": "2015-10-31T15:19:32.050Z"
        }]
    }, {
        "timesheet_id": "605284a3-385f-47f2-99e9-7c9707f67b68",
        "engagement": "204253",
        "startDate": "2015-09-18T22:34:34.206Z",
        "endDate": "2015-10-02T22:34:34.206Z",
        "entries": [{
            "row_id": "96fa1e0d-fc36-4a57-be00-97ab7b5dd3c1",
            "service": "timesheets",
            "duration": 7.25,
            "date": "2015-09-29T20:41:59.735Z"
        }, {
            "row_id": "1c615862-403b-44a0-b633-f6c3d3be6ef1",
            "service": "Critical Incidence",
            "duration": 10,
            "date": "2015-09-23T10:29:38.168Z"
        }]
    }, {
        "timesheet_id": "39fa53db-f9d1-4daf-977a-cad3959adcbc",
        "engagement": "205426",
        "startDate": "2015-05-11T13:06:45.526Z",
        "endDate": "2015-05-25T13:06:45.526Z",
        "entries": [{
            "row_id": "44d9a5a5-672f-4bcf-9183-88515249c73d",
            "service": "Critical Incidence",
            "duration": 8.75,
            "date": "2015-05-17T18:04:17.917Z"
        }, {
            "row_id": "50fb6f11-833e-4526-a023-3139d9a87ff3",
            "service": "Administrative",
            "duration": 9,
            "date": "2015-05-23T20:24:42.865Z"
        }]
    }, {
        "timesheet_id": "475b779a-9427-452c-a857-68b5f3628f57",
        "engagement": "135465",
        "startDate": "2015-03-17T22:09:08.313Z",
        "endDate": "2015-03-31T22:09:08.313Z",
        "entries": [{
            "row_id": "119b64f7-03be-4e49-a4af-4fdd4c6f7e2d",
            "service": "Case Consult",
            "duration": 1.75,
            "date": "2015-03-23T14:37:32.233Z"
        }]
    }, {
        "timesheet_id": "7b562afa-4632-4e39-b420-a2f596708476",
        "engagement": "218418",
        "startDate": "2015-08-18T14:04:25.336Z",
        "endDate": "2015-09-01T14:04:25.336Z",
        "entries": [{
            "row_id": "d72c91e2-b10a-4471-83de-e9c47524d879",
            "service": "Case Consult",
            "duration": 3,
            "date": "2015-08-28T04:58:26.850Z"
        }, {
            "row_id": "9ad881f5-42e9-431a-bf48-40d6c2189135",
            "service": "Critical Incidence",
            "duration": 8,
            "date": "2015-08-27T22:42:07.668Z"
        }, {
            "row_id": "cbd43889-5133-432d-91a6-3f68edebe616",
            "service": "Pick up",
            "duration": 12.25,
            "date": "2015-08-27T08:11:50.939Z"
        }, {
            "row_id": "c7d12a95-7cc2-4bb8-80d4-845298723483",
            "service": "Pick up",
            "duration": 9,
            "date": "2015-09-01T11:06:44.574Z"
        }]
    }]
}, {
    name: "Tim Russel",
    hours: 15,
    timesheets: [{
        "timesheet_id": "cc69da19-7146-4224-bdfd-2797894b4b89",
        "engagement": "645866",
        "startDate": "2015-07-20T13:45:23.619Z",
        "endDate": "2015-08-03T13:45:23.619Z",
        "entries": [{
            "row_id": "e10cc610-427a-4b0f-95f4-ade32b1d42db",
            "service": "Critical Incidence",
            "duration": 6.25,
            "date": "2015-08-02T09:08:34.932Z"
        }, {
            "row_id": "3f4e12ed-f6d3-440a-bb7e-2ebee6351919",
            "service": "Pick up",
            "duration": 9,
            "date": "2015-07-21T14:10:10.227Z"
        }]
    }, {
        "timesheet_id": "b48742dd-10d4-47b5-97c7-47e379719e0e",
        "engagement": "555575",
        "startDate": "2015-08-04T10:01:51.967Z",
        "endDate": "2015-08-18T10:01:51.967Z",
        "entries": [{
            "row_id": "fea539ce-cb7d-486e-a264-947688b7ec68",
            "service": "Phone Call",
            "duration": 12.75,
            "date": "2015-08-13T06:01:38.638Z"
        }]
    }, {
        "timesheet_id": "7f0bd45a-6724-4623-977a-5f2a33c2b251",
        "engagement": "624510",
        "startDate": "2015-07-18T02:16:14.453Z",
        "endDate": "2015-08-01T02:16:14.453Z",
        "entries": [{
            "row_id": "8ac541f1-11a7-44c9-a29c-70c5977a7589",
            "service": "Critical Incidence",
            "duration": 12.5,
            "date": "2015-07-31T10:45:06.644Z"
        }, {
            "row_id": "6da3b4aa-f664-427f-99bf-de9b1439b9dd",
            "service": "timesheets",
            "duration": 8.75,
            "date": "2015-07-19T20:15:25.788Z"
        }]
    }, {
        "timesheet_id": "aecbcacc-49c4-4a92-9de5-c709438bf7eb",
        "engagement": "860227",
        "startDate": "2015-04-12T03:55:31.117Z",
        "endDate": "2015-04-26T03:55:31.117Z",
        "entries": [{
            "row_id": "03d7bc92-476e-4592-9da9-793cb2400c13",
            "service": "timesheets",
            "duration": 1.75,
            "date": "2015-04-19T01:49:39.951Z"
        }, {
            "row_id": "6e2a074b-f88c-4bbb-ba5f-016c7372c7d5",
            "service": "Pick up",
            "duration": 1.5,
            "date": "2015-04-12T21:09:55.473Z"
        }, {
            "row_id": "65791663-110d-4de5-aabf-b6d25989aa4d",
            "service": "Pick up",
            "duration": 5.25,
            "date": "2015-04-15T11:08:30.896Z"
        }, {
            "row_id": "7aa84525-76b0-4481-b6f6-f45f532c5203",
            "service": "timesheets",
            "duration": 8.25,
            "date": "2015-04-18T17:53:52.335Z"
        }]
    }, {
        "timesheet_id": "8e4e0e9a-834d-45da-acb8-6ca247b27947",
        "engagement": "841303",
        "startDate": "2015-12-28T07:07:27.124Z",
        "endDate": "2016-01-11T07:07:27.124Z",
        "entries": [{
            "row_id": "9b874a72-a600-41bd-abac-10485fa95377",
            "service": "Pick up",
            "duration": 5.25,
            "date": "2016-01-08T17:41:30.577Z"
        }, {
            "row_id": "f6f6653c-5829-4ea6-b737-68013566906a",
            "service": "Case Consult",
            "duration": 10.75,
            "date": "2015-12-28T16:14:31.325Z"
        }, {
            "row_id": "4bb65a94-7315-49e5-bd2a-3936a98d9271",
            "service": "Critical Incidence",
            "duration": 2.5,
            "date": "2016-01-07T17:33:56.338Z"
        }, {
            "row_id": "7fc4cdfa-8e8f-4283-a10c-09ea1a258c8c",
            "service": "timesheets",
            "duration": 9,
            "date": "2015-12-29T15:20:31.108Z"
        }]
    }, {
        "timesheet_id": "167e3a83-7697-4b24-b3d7-d4973e8b29ac",
        "engagement": "001866",
        "startDate": "2015-02-24T13:23:48.234Z",
        "endDate": "2015-03-10T13:23:48.234Z",
        "entries": [{
            "row_id": "20615233-48ff-495e-abe7-4bcb1c61b7ab",
            "service": "Critical Incidence",
            "duration": 6.5,
            "date": "2015-02-28T04:58:56.196Z"
        }, {
            "row_id": "278e5733-0b73-4507-a674-5938c17bd9d2",
            "service": "Critical Incidence",
            "duration": 12,
            "date": "2015-03-09T10:27:35.551Z"
        }, {
            "row_id": "1e5329bd-9f48-41ec-b5a8-7317f2022d78",
            "service": "Pick up",
            "duration": 8.75,
            "date": "2015-02-25T17:44:22.570Z"
        }]
    }, {
        "timesheet_id": "b255508e-edad-44ac-9548-7d59236aed0f",
        "engagement": "133665",
        "startDate": "2015-09-09T01:27:41.498Z",
        "endDate": "2015-09-23T01:27:41.498Z",
        "entries": [{
            "row_id": "f866ce98-4672-46c1-b9ca-8634e3651c04",
            "service": "Phone Call",
            "duration": 0.75,
            "date": "2015-09-21T22:06:09.903Z"
        }, {
            "row_id": "46ec2287-f30c-47f2-9f15-de3bca788fc5",
            "service": "Critical Incidence",
            "duration": 9.25,
            "date": "2015-09-10T11:13:06.143Z"
        }, {
            "row_id": "154f9528-a093-4efd-a049-e757016fff54",
            "service": "Case Consult",
            "duration": 7,
            "date": "2015-09-22T15:51:36.532Z"
        }, {
            "row_id": "ea4b2897-7890-45f3-8042-e7a9b0309383",
            "service": "Administrative",
            "duration": 2.5,
            "date": "2015-09-15T03:57:23.326Z"
        }, {
            "row_id": "c9ca4fd8-9feb-42ab-aa78-b4364503c3a9",
            "service": "Critical Incidence",
            "duration": 9.75,
            "date": "2015-09-16T10:15:05.613Z"
        }, {
            "row_id": "abf1cde2-7a1f-4fd8-9bcf-5008e1a9b343",
            "service": "timesheets",
            "duration": 3.75,
            "date": "2015-09-16T10:17:18.411Z"
        }]
    }, {
        "timesheet_id": "9fb150c8-f79b-4b0c-8673-3441f643315f",
        "engagement": "160562",
        "startDate": "2015-07-16T05:36:23.728Z",
        "endDate": "2015-07-30T05:36:23.728Z",
        "entries": [{
            "row_id": "f4d812c7-ad00-4256-a66b-f920d13cab51",
            "service": "Pick up",
            "duration": 7.25,
            "date": "2015-07-24T16:34:01.893Z"
        }, {
            "row_id": "913244b3-380b-431f-90a0-4e4361960440",
            "service": "Pick up",
            "duration": 8.75,
            "date": "2015-07-27T05:42:18.378Z"
        }, {
            "row_id": "ed347d75-b159-40b2-a696-708bbb0145c3",
            "service": "Administrative",
            "duration": 10.75,
            "date": "2015-07-26T02:40:47.754Z"
        }, {
            "row_id": "7d236143-34d2-469e-9206-00aafb840403",
            "service": "Critical Incidence",
            "duration": 4,
            "date": "2015-07-20T06:46:26.648Z"
        }]
    }, {
        "timesheet_id": "05a5b5dc-5a61-4933-a1fe-42838236ad23",
        "engagement": "782708",
        "startDate": "2015-11-23T03:29:04.980Z",
        "endDate": "2015-12-07T03:29:04.980Z",
        "entries": [{
            "row_id": "ab3ac81a-239c-442a-a853-ee21ac7d5388",
            "service": "Phone Call",
            "duration": 10.25,
            "date": "2015-11-24T10:40:52.457Z"
        }]
    }, {
        "timesheet_id": "1985a0d6-34f1-4a3f-9a31-b1e8c930c29a",
        "engagement": "300703",
        "startDate": "2015-10-28T20:04:03.241Z",
        "endDate": "2015-11-11T20:04:03.241Z",
        "entries": [{
            "row_id": "681e866b-3d20-4e80-a0b2-c3f991766bb7",
            "service": "Case Consult",
            "duration": 8.75,
            "date": "2015-11-02T14:03:16.684Z"
        }, {
            "row_id": "a7edde39-4b58-4a20-93d2-cf3e063b0b58",
            "service": "Pick up",
            "duration": 11,
            "date": "2015-11-10T14:37:52.959Z"
        }, {
            "row_id": "103a769c-5084-48f5-b116-ed35157eff52",
            "service": "Phone Call",
            "duration": 8,
            "date": "2015-11-11T15:04:47.654Z"
        }, {
            "row_id": "11fe7e17-3832-4cf4-87bb-b813f7f5f902",
            "service": "Administrative",
            "duration": 2.25,
            "date": "2015-10-31T00:16:34.351Z"
        }, {
            "row_id": "6eb06d4c-468f-4e26-8c65-ef51aa423abc",
            "service": "Critical Incidence",
            "duration": 6,
            "date": "2015-11-10T09:20:35.836Z"
        }, {
            "row_id": "c151a218-c227-4a79-a10c-86ac4619ff0d",
            "service": "Case Consult",
            "duration": 13,
            "date": "2015-11-08T05:41:39.948Z"
        }]
    }]
}];

var staffStore = Flux.createStore({
    getAllStaff: function() {
        return _staff;
    },
    getStaff: function(){
        return this.findStaff();
    },
    setStaff: function(staff) {
        return;
    },
    findStaff: function(name){
        for(i = 0; i< _staff.index; i++){
            if(staff[i].name === name){
                return staff[i];
            }
        }
    }
},
    function(payload) {
        if (payload.actionType === "SET_STAFF") {
            // this.setStaff(payload.data);
            this.emitChange();
        }
        if (payload.actionType === "OTHER") {
            this.emitChange();
        }
    });

module.exports = staffStore;
