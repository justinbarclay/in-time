let org = {
    "owner": {
        "name":{
            "first": "Jane Doe",
        },
        "role": "Owner",
        "id": 37290,
        "organization": "Example Inc."
    },
    "employees": [
        {
            "name": "Gillian Manderson",
            "email": "gmanderson@blahmail.com",
            "userID": 82,
            "role": "Supervisor",
            "staffID": [13, 15, 23]
        }, {
            "name": "David Duchovny",
            "userID": 72,
            "email": "dduchovny@blahmail.com",
            "role": "Supervisor",
            "staffID": [98],
            "timesheets":[{"timesheetID":"f5039add-9e2d-423e-89e9-7fcfeb08a639","engagement":"828756","startDate":"2015-05-01","endDate":"2015-05-15","entries":[{"rowID":"8064dc5f-8e0c-4e97-800d-a2c34324299a","service":"Timesheets","duration":5.5,"date":"2015-05-09","delete":false},{"rowID":"48826c75-1166-4934-9a85-736d59e2cc60","service":"Timesheets","duration":12,"date":"2015-05-06","delete":false},{"rowID":"d87ba933-0917-468a-a4eb-2451b8103f11","service":"Critical Incidence","duration":5.5,"date":"2015-05-04","delete":false},{"rowID":"137ef489-0b46-4e9f-b225-7e43858a836b","service":"Critical Incidence","duration":11.75,"date":"2015-05-14","delete":false},{"rowID":"d81d6642-bd34-4f7c-9b74-e6fa66d79a7b","service":"Phone Call","duration":7,"date":"2015-05-04","delete":false}]},{"timesheetID":"72b475a1-f5c2-498b-b9a3-b0370efd4646","engagement":"287818","startDate":"2015-09-09","endDate":"2015-09-23","entries":[{"rowID":"df3b0c0d-d318-499e-9d1c-697302f1fe8d","service":"Administrative","duration":11.75,"date":"2015-09-15","delete":false}]},{"timesheetID":"c7a6e543-2b51-414b-9709-c1e45bb4e949","engagement":"185274","startDate":"2015-06-12","endDate":"2015-06-26","entries":[{"rowID":"f9829f4e-8ac5-4d3a-a780-960417270317","service":"Timesheets","duration":10.5,"date":"2015-06-20","delete":false},{"rowID":"51540dcb-fadb-439d-a57a-778cb82e3c15","service":"Timesheets","duration":8.75,"date":"2015-06-20","delete":false}]},{"timesheetID":"39dcaacc-7f88-43fa-a5ab-a05c0a4c0123","engagement":"316255","startDate":"2015-10-25","endDate":"2015-11-08","entries":[{"rowID":"aa25450b-4a3d-48a0-8188-3914cc512375","service":"Critical Incidence","duration":11,"date":"2015-10-27","delete":false},{"rowID":"66f12667-de21-4c4f-a06d-f336df28bbeb","service":"Phone Call","duration":5.75,"date":"2015-11-05","delete":false}]},{"timesheetID":"517b4f67-7810-44d5-8fdd-e61e4da54c99","engagement":"387858","startDate":"2015-09-07","endDate":"2015-09-21","entries":[{"rowID":"be36707f-3ba6-4f9b-97f9-cb77e5b6fef9","service":"Phone Call","duration":12.25,"date":"2015-09-18","delete":false},{"rowID":"5c49faf1-0ea8-4768-a4ff-0838680b807d","service":"Phone Call","duration":3.25,"date":"2015-09-09","delete":false},{"rowID":"2a0ab8c0-a3f8-4be5-8ce7-37783d8348b4","service":"Administrative","duration":0.5,"date":"2015-09-12","delete":false}]},{"timesheetID":"d6347c66-45df-49e1-9030-5705ec53d2c7","engagement":"354450","startDate":"2016-05-11","endDate":"2016-05-25","entries":[{"rowID":"bd38ee3e-cb84-4fe2-9c25-ad2ab20eff47","service":"Phone Call","duration":8,"date":"2016-05-17","delete":false}]},{"timesheetID":"51247961-60a0-469a-bb99-c2a49e849282","engagement":"518555","startDate":"2016-02-07","endDate":"2016-02-21","entries":[{"rowID":"b9fa6bbd-333b-405b-b187-ae2686e08620","service":"Critical Incidence","duration":6.5,"date":"2016-02-10","delete":false},{"rowID":"940dd0a4-ded1-4904-9180-5aa7a9f7c3b3","service":"Administrative","duration":6,"date":"2016-02-18","delete":false},{"rowID":"3f9af1ff-4974-4c4d-941e-0a320e5427d6","service":"Timesheets","duration":9.75,"date":"2016-02-19","delete":false},{"rowID":"04574919-64e1-4255-9bf2-a48b21fae7a1","service":"Phone Call","duration":1.25,"date":"2016-02-08","delete":false}]},{"timesheetID":"2d9e58b1-4d4c-40f7-a412-7c5904e47a60","engagement":"287561","startDate":"2016-04-24","endDate":"2016-05-08","entries":[{"rowID":"33482bf0-4d41-4d0b-9cb5-9927e9a9e2c4","service":"Administrative","duration":1.75,"date":"2016-04-29","delete":false},{"rowID":"6c15ca44-930d-4f78-ae02-29dc4f439dc0","service":"Phone Call","duration":10.75,"date":"2016-04-28","delete":false}]},{"timesheetID":"1cbc8f32-2d48-4b32-8210-6a4a4ccb07c8","engagement":"013026","startDate":"2016-01-23","endDate":"2016-02-06","entries":[{"rowID":"cb1a9d3a-6338-46db-9842-f29682766e0f","service":"Pick up","duration":3,"date":"2016-01-30","delete":false},{"rowID":"8d5c8189-f450-4efe-9b70-67581f4aaf2b","service":"Critical Incidence","duration":6.5,"date":"2016-01-27","delete":false},{"rowID":"02e103e7-0911-40fd-bc3e-164d39a7c9fb","service":"Administrative","duration":3.25,"date":"2016-02-03","delete":false},{"rowID":"27a4070a-f26f-4d8d-8902-fc177a58d75d","service":"Phone Call","duration":12,"date":"2016-01-26","delete":false},{"rowID":"4cf17812-6eb5-4dff-9ed7-feb62c31937f","service":"Pick up","duration":9.75,"date":"2016-02-02","delete":false}]},{"timesheetID":"04aa7207-8161-4f01-94d6-cf81a067b655","engagement":"171727","startDate":"2015-06-26","endDate":"2015-07-10","entries":[{"rowID":"7d6bd3b1-eb15-4c8e-9b78-6e26d54a527c","service":"Administrative","duration":5,"date":"2015-07-03","delete":false},{"rowID":"f985d74c-752f-4efe-bd54-377a69de8f0b","service":"Pick up","duration":11.75,"date":"2015-06-29","delete":false},{"rowID":"2bd098b5-8d5d-414a-8e0a-367256128957","service":"Pick up","duration":0.25,"date":"2015-07-02","delete":false}]}]
        }, {
            "name": "Josh Brolin",
            "supervisorID": 82,
            "role": "Staff",
            "email": "jbrolin@blahmail.com",
            "userID": 13,
            "hours": 31,
            "timesheets":
            [{"timesheetID":"497a5c78-a806-42d3-a804-bf415058cb44","engagement":"505710","startDate":"2015-12-13","endDate":"2015-12-27","approved":false,"entries":[{"rowID":"1450103c-e5a8-4154-a22b-f2f98f04a8bb","service":"Critical Incidence","duration":3.75,"date":"2015-12-20","delete":false},{"rowID":"d5310ce5-1f89-4ac1-a0c0-c2b0dad190f8","service":"Critical Incidence","duration":10.5,"date":"2015-12-17","delete":false}]},{"timesheetID":"106f8dc0-b929-43c0-91d5-2bb08cf18fab","engagement":"830338","startDate":"2015-05-28","endDate":"2015-06-11","entries":[{"rowID":"57c6b609-6298-4ea8-a586-2a36f24e3a47","service":"Administrative","duration":7.75,"date":"2015-06-09","delete":false},{"rowID":"8e3c637b-8163-4ad4-8ab7-d5ce4e288719","service":"Critical Incidence","duration":2.5,"date":"2015-05-31","delete":false},{"rowID":"2c4961e9-7f10-4383-85ac-89ab778fb6f1","service":"Phone Call","duration":7,"date":"2015-06-05","delete":false},{"rowID":"0832665f-4751-4858-a560-7ec0cb848dd1","service":"Phone Call","duration":1.5,"date":"2015-06-06","delete":false},{"rowID":"f135005e-aae1-48d9-b0d4-a5c061c3f481","service":"Phone Call","duration":1,"date":"2015-06-05","delete":false},{"rowID":"63378887-0e79-4ac4-ac3d-ca62cd991493","service":"Administrative","duration":13,"date":"2015-06-04","delete":false}]},{"timesheetID":"776c68ea-ab87-4787-98c7-baa7fe124dba","engagement":"867518","startDate":"2015-04-13","endDate":"2015-04-27","entries":[{"rowID":"4a6b9906-9304-45ca-b2a0-aa06d0a0fcb9","service":"Pick up","duration":9.75,"date":"2015-04-23","delete":false},{"rowID":"bd342376-346f-4957-b2b4-65903aa8af9e","service":"Phone Call","duration":4.5,"date":"2015-04-27","delete":false}]},{"timesheetID":"b1dfe88a-9cc8-4b5f-a2a5-3e3d7974152a","engagement":"248333","startDate":"2015-09-16","endDate":"2015-09-30","entries":[{"rowID":"bc27cec9-4791-47ea-a0bd-e715507da46b","service":"Phone Call","duration":0.5,"date":"2015-09-24","delete":false},{"rowID":"aec98c55-c774-4273-95ad-d894a00d55dc","service":"Critical Incidence","duration":9,"date":"2015-09-23","delete":false},{"rowID":"f691a74d-ee5b-470c-8a97-f95c556aacef","service":"Critical Incidence","duration":1.5,"date":"2015-09-17","delete":false},{"rowID":"a5ed924e-e056-4a8d-aa0c-f94770daa76e","service":"Pick up","duration":5.25,"date":"2015-09-25","delete":false}]},{"timesheetID":"bfd7d23a-336f-4d8c-897e-452add89b2f1","engagement":"401704","startDate":"2015-08-23","endDate":"2015-09-06","entries":[{"rowID":"4ffcb19d-e6b0-4754-a8eb-57df175aa017","service":"Administrative","duration":9.75,"date":"2015-09-01","delete":false},{"rowID":"09adad7e-d45d-4929-bcc5-8450a3681216","service":"Pick up","duration":7.5,"date":"2015-08-30","delete":false},{"rowID":"f8d7de21-cbfb-48de-b1c8-e06a4132efda","service":"Administrative","duration":11.75,"date":"2015-09-01","delete":false},{"rowID":"8bd83752-3b16-4bca-a1d4-883b8cf82401","service":"Case Consult","duration":0.5,"date":"2015-08-24","delete":false},{"rowID":"a882957d-b83d-4fa4-b929-456b068119e9","service":"Case Consult","duration":0.25,"date":"2015-09-06","delete":false},{"rowID":"28fb777f-086b-4522-9f04-6bf33d43156e","service":"Administrative","duration":1.25,"date":"2015-08-26","delete":false},{"rowID":"4e2a9128-bd99-42f1-b10b-d737086d41d0","service":"Phone Call","duration":10.5,"date":"2015-08-29","delete":false}]},{"timesheetID":"61dc7a99-ebe0-4564-ab31-521b0d0ddcde","engagement":"011078","startDate":"2015-03-17","endDate":"2015-03-31","entries":[{"rowID":"4b4696fe-10a6-4252-948e-a6a4e313d3d9","service":"Phone Call","duration":2.25,"date":"2015-03-25","delete":false},{"rowID":"99c625c5-3021-446f-b350-c9329028de94","service":"Phone Call","duration":10.25,"date":"2015-03-22","delete":false},{"rowID":"a9ff9d21-1074-42f7-8c91-a4a464f0ff7f","service":"Case Consult","duration":6.25,"date":"2015-03-21","delete":false},{"rowID":"6c6950f0-abd0-4f7d-b453-b1736ad9531e","service":"Administrative","duration":1.5,"date":"2015-03-29","delete":false},{"rowID":"96cc3620-e9de-45e3-b36f-3e9850de0230","service":"timesheets","duration":4,"date":"2015-03-22","delete":false}]},{"timesheetID":"398a6915-5b8d-4e22-be22-deeaa2a654d3","engagement":"543602","startDate":"2015-12-11","endDate":"2015-12-25","entries":[{"rowID":"0e47c88c-abae-4084-bb36-c2f3a1b4d79f","service":"Phone Call","duration":10.25,"date":"2015-12-23","delete":false},{"rowID":"9ac57edb-8611-42ab-ad6c-7a36d4570499","service":"Critical Incidence","duration":11,"date":"2015-12-24","delete":false}]},{"timesheetID":"0ffc0548-e12c-4acf-9ec3-f7a5b824cd17","engagement":"322662","startDate":"2015-08-14","endDate":"2015-08-28","entries":[{"rowID":"503f0ca9-fdbf-4635-9ff3-51fba5acfab3","service":"Administrative","duration":11,"date":"2015-08-28","delete":false},{"rowID":"3bba5454-441e-4fa3-a642-946a8a0c8adf","service":"Phone Call","duration":5.5,"date":"2015-08-26","delete":false}]},{"timesheetID":"3b564d93-979b-44e3-a0aa-38c3fc8f13be","engagement":"571302","startDate":"2015-10-13","endDate":"2015-10-27","entries":[{"rowID":"9fa87097-5bc8-4b76-b266-5a8534d92a46","service":"Critical Incidence","duration":12.5,"date":"2015-10-22","delete":false},{"rowID":"caf38c50-20c1-4184-847e-fdd2c6a24f19","service":"Critical Incidence","duration":8,"date":"2015-10-16","delete":false},{"rowID":"2c4dadc4-539f-4951-a5f2-9cffb6289140","service":"Phone Call","duration":2.5,"date":"2015-10-13","delete":false},{"rowID":"23de75de-41a8-497b-a7eb-c228905c1ec2","service":"Phone Call","duration":4.5,"date":"2015-10-24","delete":false}]},{"timesheetID":"62e95802-c8f1-4383-89cb-129a53d00d54","engagement":"650787","startDate":"2015-06-16","endDate":"2015-06-30","entries":[{"rowID":"622e7aa9-b004-48bc-abc5-67769bfb6d92","service":"Pick up","duration":3.75,"date":"2015-06-25","delete":false},{"rowID":"2fcd3cd6-83d3-4bff-be9b-1643041ee64d","service":"Pick up","duration":5.75,"date":"2015-06-18","delete":false},{"rowID":"fff569c5-4826-4126-85a6-7300f7f48578","service":"Critical Incidence","duration":4.5,"date":"2015-06-22","delete":false},{"rowID":"18f6a7e3-a8b7-4a05-86d5-ce92cfbbaf4f","service":"Phone Call","duration":11.25,"date":"2015-06-21","delete":false}]}]

        }, {
            "name": "Emily Buffington",
            "supervisorID": 82,
            "role": "Staff",
            "email": "ebuffington@blahmail.com",
            "userID": 15,
            "hours": 40,
            "timesheets":
            [{"timesheetID":"6ed560a7-e43b-4bd0-9d9c-3c0932678e1a","engagement":"746054","startDate":"2015-12-15","endDate":"2015-12-29","approved":false,"entries":[{"rowID":"f353b41c-7c3f-40de-9f0b-9c0bb99b739a","service":"Administrative","duration":2,"date":"2015-12-22","delete":false},{"rowID":"b58e4240-7507-40ff-ab06-3dfa6392152a","service":"Phone Call","duration":4,"date":"2015-12-28","delete":false}]},{"timesheetID":"40e82c95-e881-40f2-89b4-fa9b7570e2e3","engagement":"762370","startDate":"2015-06-29","endDate":"2015-07-13","entries":[{"rowID":"33621cae-49ca-4b56-92c0-4f180f1383cd","service":"Phone Call","duration":1.75,"date":"2015-07-06","delete":false},{"rowID":"be076fb5-a4b9-4e71-8262-b458fe89ec7e","service":"Critical Incidence","duration":2,"date":"2015-06-30","delete":false},{"rowID":"2a5c8c9b-e790-4363-a90e-19ed3fd2a5f1","service":"Administrative","duration":4.75,"date":"2015-07-02","delete":false},{"rowID":"57bd5280-57bf-49fe-8fe4-6a6d51f2835f","service":"Critical Incidence","duration":11,"date":"2015-07-05","delete":false},{"rowID":"5000eeca-9f5c-4089-9065-da56d3d91ca2","service":"timesheets","duration":9,"date":"2015-07-12","delete":false}]},{"timesheetID":"415df051-fd5f-4c6f-a4e7-4b6cc7d7425e","engagement":"825700","startDate":"2015-05-26","endDate":"2015-06-09","entries":[{"rowID":"c937f0c7-da6c-4783-b5e0-f7b9e12d9638","service":"Case Consult","duration":12.75,"date":"2015-05-29","delete":false},{"rowID":"2703a784-af45-4a09-bee3-4bd1bede1b01","service":"Pick up","duration":9.75,"date":"2015-05-26","delete":false},{"rowID":"e5a75faa-894a-4026-b1a2-0803aa373849","service":"timesheets","duration":5.75,"date":"2015-06-05","delete":false},{"rowID":"53cc2d93-1aca-43bd-9f1a-20ed31656d26","service":"Phone Call","duration":4,"date":"2015-06-04","delete":false},{"rowID":"ec1f4aaa-9dfa-4fee-90d4-b2955d8ef0f8","service":"Administrative","duration":9,"date":"2015-06-07","delete":false}]},{"timesheetID":"2d8aef00-16b3-45d7-94e1-5ae1fe664af8","engagement":"255531","startDate":"2015-06-27","endDate":"2015-07-11","entries":[{"rowID":"8d40004e-df5f-44b1-a7ce-dd41064c3b5e","service":"Phone Call","duration":0.25,"date":"2015-07-03","delete":false}]},{"timesheetID":"df2eb518-6509-4071-a528-9f7c6f9cb1ba","engagement":"233464","startDate":"2015-11-09","endDate":"2015-11-23","entries":[{"rowID":"70f7a0ee-7083-44ee-9a83-3578e7401562","service":"Critical Incidence","duration":8.5,"date":"2015-11-19","delete":false},{"rowID":"ddd10d8d-c030-4817-9b05-685b8fafd2cb","service":"timesheets","duration":0.5,"date":"2015-11-23","delete":false}]},{"timesheetID":"084bcf74-c785-4b66-be45-d620618887be","engagement":"884511","startDate":"2015-03-11","endDate":"2015-03-25","entries":[{"rowID":"67bc3dc6-66e4-4e41-8696-17fa3ceff720","service":"Administrative","duration":6.25,"date":"2015-03-13","delete":false},{"rowID":"9b24f0a8-006a-4ca5-9462-6d328490e40f","service":"Administrative","duration":4.5,"date":"2015-03-16","delete":false},{"rowID":"98bdb957-83ba-4bee-b2e8-5f69945498d3","service":"Pick up","duration":9.25,"date":"2015-03-16","delete":false},{"rowID":"1187d4e3-f2c2-4740-bad7-fd05622b1139","service":"Critical Incidence","duration":3.25,"date":"2015-03-21","delete":false},{"rowID":"8022bcd1-e0f1-4c84-ac44-32d1213951cc","service":"Pick up","duration":0.75,"date":"2015-03-13","delete":false}]},{"timesheetID":"f33b0b02-42bc-4465-8d4f-6a8162f1e6a8","engagement":"801322","startDate":"2015-12-24","endDate":"2016-01-07","entries":[{"rowID":"8790eeb6-8773-4821-b0fb-b22fb5b2a4cc","service":"Critical Incidence","duration":12.5,"date":"2015-12-27","delete":false}]},{"timesheetID":"548eab26-a731-4eb5-988c-5087cc663fa7","engagement":"875221","startDate":"2015-02-07","endDate":"2015-02-21","entries":[{"rowID":"8d416e75-b3c3-4440-a9e0-cc2444983fd5","service":"timesheets","duration":11.25,"date":"2015-02-08","delete":false},{"rowID":"f741b01e-7e61-41f9-914f-c0d1076533b9","service":"Administrative","duration":6.25,"date":"2015-02-19","delete":false},{"rowID":"142770f4-3f00-4800-886e-f459ba06ccd1","service":"Pick up","duration":8.5,"date":"2015-02-18","delete":false}]},{"timesheetID":"371df42c-7c4e-49bd-b7c0-68ebecf2d6ab","engagement":"752078","startDate":"2015-10-29","endDate":"2015-11-12","entries":[{"rowID":"e5562c92-be9a-4450-afa9-2b28b57c3ba6","service":"timesheets","duration":3.75,"date":"2015-11-12","delete":false},{"rowID":"f0896d1c-e713-4b50-bbc3-15094123e49e","service":"Critical Incidence","duration":2.25,"date":"2015-11-09","delete":false},{"rowID":"9b84c97a-2c4a-405d-b09f-b08b1f47e4dc","service":"Administrative","duration":10.75,"date":"2015-11-05","delete":false},{"rowID":"c5424a4b-3c40-4553-a1c1-3bd417bc64d6","service":"Case Consult","duration":3.5,"date":"2015-11-09","delete":false}]},{"timesheetID":"c8b262aa-ea10-4617-9443-ccf9e54d5e27","engagement":"250010","startDate":"2015-02-24","endDate":"2015-03-10","entries":[{"rowID":"e3e05dc2-a2d0-4bee-bc26-cb357bfc1194","service":"Pick up","duration":10.5,"date":"2015-02-24","delete":false},{"rowID":"e244186a-72b7-4980-9f1b-c9c7dd3df8d5","service":"Case Consult","duration":8.75,"date":"2015-03-03","delete":false},{"rowID":"0b4919e5-9c4b-4d49-b2b3-f2baca50653d","service":"Phone Call","duration":1.25,"date":"2015-03-03","delete":false}]}]

        }, {
            "name": "Tim Russel",
            "supervisorID": 82,
            "role": "Staff",
            "email": "trussel@blahmail.com",
            "userID": 23,
            "hours": 15,
            "timesheets":
            [{"timesheetID":"ef76c1a7-f9fc-4af9-ad81-1c0e30e563fc","engagement":"563168","startDate":"2015-08-07","endDate":"2015-08-21","approved":false,"entries":[{"rowID":"56f37c0b-412f-4265-ad09-0c87b219f21e","service":"Pick up","duration":0.5,"date":"2015-08-09","delete":false},{"rowID":"dcf0464d-e1a2-4eca-bed7-b38842d8d7a6","service":"Phone Call","duration":8.25,"date":"2015-08-10","delete":false},{"rowID":"02c67cb0-2f68-48d6-9698-d5a201b7b0f2","service":"timesheets","duration":2,"date":"2015-08-19","delete":false},{"rowID":"0b33bfb3-0ee4-48e0-bc30-353e636278b9","service":"timesheets","duration":7.5,"date":"2015-08-11","delete":false},{"rowID":"3a7995b3-a40e-4e22-8e66-ef247f934bd5","service":"Pick up","duration":6.5,"date":"2015-08-08","delete":false}]},{"timesheetID":"1c2b08f3-0068-42e9-98ed-d6e5c2e5b1c3","engagement":"517430","startDate":"2015-06-18","endDate":"2015-07-02","entries":[{"rowID":"f85a3fc9-ba28-40ad-81c4-564a4cb70791","service":"Critical Incidence","duration":1.75,"date":"2015-06-26","delete":false},{"rowID":"00bece4b-4be7-4930-80b9-e621f838d7ec","service":"Administrative","duration":11.5,"date":"2015-06-22","delete":false},{"rowID":"6d639f85-1bde-47ab-8339-825484a2a7a8","service":"Pick up","duration":2.75,"date":"2015-06-26","delete":false},{"rowID":"603f20c2-ce8c-4d6e-b807-9ebe5ab58780","service":"timesheets","duration":8.5,"date":"2015-06-18","delete":false},{"rowID":"67bf86c6-1114-4ff9-ba30-1bb18bbeb96e","service":"timesheets","duration":12.75,"date":"2015-06-25","delete":false}]},{"timesheetID":"fef33a48-ccab-4a4e-9b96-44f8a7ec0bc2","engagement":"072362","startDate":"2015-05-19","endDate":"2015-06-02","entries":[{"rowID":"a9befecc-d356-43d8-952d-a054cd6ad8f1","service":"Case Consult","duration":4.5,"date":"2015-05-20","delete":false},{"rowID":"a4dbab3b-1ec7-4892-8cb2-42ddf7cd0384","service":"timesheets","duration":2,"date":"2015-05-23","delete":false},{"rowID":"affbdd98-fab5-4fdf-be54-7895b297a20a","service":"Case Consult","duration":8.75,"date":"2015-05-23","delete":false}]},{"timesheetID":"0cae95c9-5b75-48f1-8832-b8dc37c35f34","engagement":"560612","startDate":"2015-03-10","endDate":"2015-03-24","entries":[{"rowID":"82c69fad-124e-4869-8d26-89ccba6d086a","service":"Critical Incidence","duration":11,"date":"2015-03-18","delete":false},{"rowID":"e3af0d2f-ab59-4339-b846-32f78d5a62c0","service":"Critical Incidence","duration":5.25,"date":"2015-03-23","delete":false}]},{"timesheetID":"6d7d1bfe-da69-4e49-82af-b001a84344cf","engagement":"631722","startDate":"2015-12-13","endDate":"2015-12-27","entries":[{"rowID":"f43e44f8-7a63-475c-8aa8-d2d39eacc935","service":"Administrative","duration":10,"date":"2015-12-23","delete":false},{"rowID":"b3227465-34bd-4c96-9a48-5af3bdbea752","service":"Pick up","duration":3.75,"date":"2015-12-26","delete":false},{"rowID":"98c83467-fbc6-4b0c-b5a4-b66448e29bd7","service":"Administrative","duration":11,"date":"2015-12-15","delete":false},{"rowID":"a0b5dec9-fcb4-4736-8c29-c6d4f8cdb561","service":"timesheets","duration":7.5,"date":"2015-12-20","delete":false},{"rowID":"7e588ad3-98e8-4e9f-9ac6-1f3333649bbb","service":"Pick up","duration":5.75,"date":"2015-12-14","delete":false},{"rowID":"6e066af6-c02c-46b7-9586-7b34527f1761","service":"Phone Call","duration":12.5,"date":"2015-12-26","delete":false},{"rowID":"2f6d22a2-84d2-4265-ab4b-c654f3436f0c","service":"timesheets","duration":12,"date":"2015-12-17","delete":false}]},{"timesheetID":"0dbb2ae5-8a02-42c2-bcfe-6c3628213f4f","engagement":"420748","startDate":"2015-05-11","endDate":"2015-05-25","entries":[{"rowID":"483ad460-b484-4a43-aa97-b807b255d3fc","service":"timesheets","duration":9.75,"date":"2015-05-18","delete":false},{"rowID":"fb93050e-07c9-4f12-a239-7add705995ab","service":"Critical Incidence","duration":4,"date":"2015-05-11","delete":false},{"rowID":"9dd04d0a-2806-4e67-8e71-c8e7b1b6ff47","service":"Critical Incidence","duration":4.25,"date":"2015-05-23","delete":false}]},{"timesheetID":"7ba9b4d0-58a0-49cd-a5a1-11af47b7c068","engagement":"432645","startDate":"2015-04-29","endDate":"2015-05-13","entries":[{"rowID":"3c874997-9f21-4ffb-82ed-9733420d2c40","service":"Administrative","duration":12.75,"date":"2015-05-04","delete":false},{"rowID":"005a896b-ab87-4fb9-9379-ff87b563be8a","service":"Case Consult","duration":11,"date":"2015-05-12","delete":false}]},{"timesheetID":"cc3cc1f3-1745-4908-8676-16e71efb2a07","engagement":"070560","startDate":"2015-12-31","endDate":"2016-01-14","entries":[{"rowID":"85ebac84-8a7e-4568-80da-f6f7efefd1e1","service":"Critical Incidence","duration":11.75,"date":"2016-01-09","delete":false},{"rowID":"88b9a8b4-3ff8-4857-948e-89dabcd6b125","service":"Administrative","duration":0.75,"date":"2016-01-03","delete":false}]},{"timesheetID":"a24abd34-3c17-4308-a7f9-4933138c4c09","engagement":"430286","startDate":"2015-05-08","endDate":"2015-05-22","entries":[{"rowID":"03f6f2a0-a584-4a53-8e75-89a1bb36e44a","service":"Administrative","duration":0.25,"date":"2015-05-12","delete":false},{"rowID":"c3a4a1e3-933d-436c-b1f7-83830241820f","service":"Phone Call","duration":9.25,"date":"2015-05-12","delete":false},{"rowID":"95bf8d94-8cda-4437-ad24-cdd12f6c16c0","service":"Administrative","duration":13,"date":"2015-05-11","delete":false},{"rowID":"59345f2e-79a7-4c2a-a63f-a6766b163e54","service":"Phone Call","duration":8.25,"date":"2015-05-12","delete":false},{"rowID":"398d6f51-03c6-4197-ac98-4b7b54b6c883","service":"timesheets","duration":0.25,"date":"2015-05-21","delete":false}]},{"timesheetID":"13be9796-b518-4e85-ac76-6c176fdfda84","engagement":"188723","startDate":"2015-11-19","endDate":"2015-12-03","entries":[{"rowID":"c8c2325c-15aa-4977-a60a-494930816a33","service":"Pick up","duration":10.5,"date":"2015-11-30","delete":false},{"rowID":"41afdc8c-755d-44c8-ab7a-56169c4fd790","service":"Pick up","duration":4.25,"date":"2015-11-22","delete":false},{"rowID":"966541ac-6e34-4fa0-a1bb-4b20abe77125","service":"timesheets","duration":10.5,"date":"2015-11-25","delete":false},{"rowID":"9b3437ad-3d86-4890-aef4-6af125ca5cc9","service":"Phone Call","duration":5.5,"date":"2015-11-29","delete":false},{"rowID":"5f10172a-7dd5-4a39-9cc4-d807eceeb277","service":"Case Consult","duration":4.25,"date":"2015-11-26","delete":false},{"rowID":"36f120d5-7d2d-43ae-abb6-570af19e6fe8","service":"Administrative","duration":9,"date":"2015-11-24","delete":false},{"rowID":"9f79b7e0-467d-438f-bfc3-fd57f699035d","service":"Administrative","duration":2.75,"date":"2015-11-28","delete":false}]}]
    }]
};

module.exports = org;