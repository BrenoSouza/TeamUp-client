angular.module('TeamUp').controller('TestingCtrl', TestingCtrl);

function TestingCtrl($scope, $http, Constants, authService, $window) {
    $scope.testForm = {
        method: '',
        quantRequisitions: 0,
        fileName: ''
    };
    $scope.log = [];

    $scope.output = '';

    const a = $window.document.getElementById('download-button');

    IDLE = 'Log de Testes';
    CREATING_MATCHES = 'Criando Partidas';
    GETTING_MATCHES_FROM_SERVER = 'Recuperando partidas do servidor';
    LOGIN = 'Entrando na conta de teste';

    $scope.statusTesting = IDLE;

    $scope.makeTest = async function () {
        $scope.statusTesting = LOGIN;
        await logUser();

        const { method, quantRequisitions } = $scope.testForm;

        if (method.toLowerCase() === 'get') {

            $scope.log = [];

            const ids = [];
            $scope.statusTesting = CREATING_MATCHES;
            for (let i = 1; i <= quantRequisitions; i++) {

                const match = {
                    date: new Date().toLocaleTimeString(),
                    description: 'something',
                    local: 'match address',
                    name: 'Match Test ' + i.toString(),
                    sport: 'Futsal'
                };

                await $http.post(Constants.MATCH, match).then(function (response) {
                    ids.push(response.data.id);
                    $scope.log.push('Partida ' + i.toString() + ' criada.');
                });
                Constants.counter++;
            }

            $scope.log.push('Todas as partidas foram criadas');
            $scope.statusTesting = GETTING_MATCHES_FROM_SERVER;

            let previousTime = new Date();
            let actualTime;
            let counter = 0;
            for (let i = 0; i < quantRequisitions; i++) {

                $http.get(Constants.MATCH + '/' + ids[i].toString()).then(function (response) {

                    actualTime = new Date();
                    const time = (actualTime - previousTime);
                    $scope.output += (time.toString() + ';\n');
                    $scope.log.push(response.data.name + ' recuperada em ' + time.toString() + 'seg.');
                    previousTime = actualTime;

                    counter++;
                    if (counter === quantRequisitions) {
                        a.href = $window.URL.createObjectURL(new Blob([$scope.output], { type: 'text/csv' }));
                        a.download = $scope.testForm.fileName + '.csv';
                        authService.logout();
                    }
                });
            }
            $scope.log.push('Todas as partidas foram recuperadas');
            $scope.statusTesting = IDLE;
        } else {
            $scope.log = [];

            $scope.statusTesting = CREATING_MATCHES;

            let previousTime = new Date();
            let actualTime;
            let counter = 0;
            for (let i = 1; i <= quantRequisitions; i++) {

                const match = {
                    date: '15/05/2000',
                    description: 'something',
                    local: 'match address',
                    name: 'Match ',
                    sport: 'Futsal'
                };

                $http.post(Constants.MATCH, match).then(function (response) {
                    actualTime = new Date();
                    const time = (actualTime - previousTime);
                    $scope.output += (time.toString() + ';\n');
                    $scope.log.push('Partida ' + i.toString() + ' criada em ' + time.toString() + ' milisecondos.');
                    previousTime = actualTime;
                    counter++;
                    if (counter === quantRequisitions) {
                        a.href = $window.URL.createObjectURL(new Blob([$scope.output], { type: 'text/csv' }));
                        a.download = $scope.testForm.fileName + '.csv';
                        authService.logout();
                    }
                });
                Constants.counter++;
            }

            $scope.log.push('Todas as partidas foram criadas');
            $scope.statusTesting = IDLE;
        }

        // a.href = $window.URL.createObjectURL(new Blob([$scope.output], { type: 'text/csv' }));
        // a.download = 'data.csv';
    }

    logUser = async function (quantUsers) {

        const user = {
            name: 'test user',
            email: 'testemail2@gmail',
            password: '123456789',
            phone: '963852741',
            address: 'fasdfasdfjadsopf'
        };
        const result = authService.authenticate(user, function (error) {
            if (error) {
                $http.post(Constants.SIGNUP, user).then(function (response) {
                    authService.login(user, function (error) {
                        if (error) {
                            console.log('error');
                        } else {
                            console.log('logged');
                        }
                    })
                });
            } else {

            }
        });

        await result;
        return result;
    }
}