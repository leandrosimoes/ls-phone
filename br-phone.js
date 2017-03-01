;(function(document, window, commonjs) {
    function fillCodes() {
        var codes = [];
        
        for (var code in br_phone.stateCodes) {
            if (br_phone.stateCodes.hasOwnProperty(code) && codes.indexOf(code) === -1) {
                var currentCodes = br_phone.stateCodes[code];
                for (var index = 0; index < currentCodes.length; index++) {
                    codes.push(currentCodes[index]);
                }
            }
        }

        return codes;
    };

    function getCode(number) {
        try {
            return parseInt(number.match(/\([0-9]{2}\)/)[0].match(/[0-9]{2}/) || '0');            
        } catch (error) {
            return 0;
        }
    };

    function validatePhoneFormat(number, withCountryCode) {
        try {
            var validateRegex = !!withCountryCode && withCountryCode === true ? 
                /\+[5, 5]{2} \([0-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}/ :
                /\([0-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}/;

            if(validateRegex.test(number)) {
                return true;
            } else {
                console.log('The phone format is invalid. Ex: (99) 9999-9999 or (99) 99999-9999');
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    function validatePhoneCode(number) {
        try {
            var code = getCode(number);
            return !!code && br_phone.phoneCodes.indexOf(code) !== -1;
        } catch (error) {
            console.log('Invalid state phone code.');
            return false;
        }
    };

    function getStateInitialsByPhoneNumber(phoneNumber) {
        var code = getCode(phoneNumber),
            stateReturn = '';
        
        for (var state in br_phone.stateCodes) {
            if (br_phone.stateCodes.hasOwnProperty(state)) {
                if(!stateReturn && br_phone.stateCodes[state].indexOf(code) !== -1) {
                    stateReturn = state;
                }                
            }
        }

        return stateReturn;
    };

    function getStateInitialsByCityCode(cityCode) {
        var code = cityCode,
            stateReturn = '';
        
        for (var state in br_phone.stateCodes) {
            if (br_phone.stateCodes.hasOwnProperty(state)) {
                if(!stateReturn && br_phone.stateCodes[state].indexOf(code) !== -1) {
                    stateReturn = state;
                }                
            }
        }

        return stateReturn;
    };

    function getStateCodes(stateInitials) {
        try {            
            return br_phone.stateCodes[stateInitials] || [];
        } catch (error) {
            return [];
        }
    };

    var br_phone = {
        isValid: function(number, withCountryCode) {
            return validatePhoneFormat(number, withCountryCode) && 
                   validatePhoneCode(number);
        },
        getStateInitialsByPhoneNumber: function(phoneNumber) {
            return getStateInitialsByPhoneNumber(phoneNumber);
        },
        getStateInitialsByCityCode: function(cityCode) {
            return getStateInitialsByCityCode(cityCode);
        },
        getStateCodes: function(stateInitials) {
            return getStateCodes(stateInitials);
        },
        getCountyCode: function() {
            return 55;
        },
        states: {
            AC: 'AC',
            AL: 'AL',
            AM: 'AM',
            AP: 'AP',
            BA: 'BA',
            CE: 'CE',
            DF: 'DF',
            ES: 'ES',
            GO: 'GO',
            MA: 'MA',
            MG: 'MG',
            MS: 'MS',
            MT: 'MT',
            PA: 'PA',
            PB: 'PB',
            PE: 'PE',
            PI: 'PI',
            PR: 'PR',
            RJ: 'RJ',
            RN: 'RN',
            RO: 'RO',
            RR: 'RR',
            RS: 'RS',
            SC: 'SC',
            SE: 'SE',
            SP: 'SP',
            TO: 'TO'
        },
        stateCodes: {
            AC: [68],
            AL: [82],
            AM: [92, 97],
            AP: [96],
            BA: [71, 73, 74, 75, 77],
            CE: [85, 88],
            DF: [61],
            ES: [27, 28],
            GO: [61, 62, 64],
            MA: [98, 99],
            MG: [31, 32, 33, 34, 35, 37, 38],
            MS: [67],
            MT: [65, 66],
            PA: [91, 93, 94],
            PB: [83],
            PE: [81, 87],
            PI: [86, 89],
            PR: [41, 42, 43, 44, 45, 46],
            RJ: [21, 22, 24],
            RN: [84],
            RO: [69],
            RR: [95],
            RS: [51, 53, 54, 55],
            SC: [47, 48, 49],
            SE: [79],
            SP: [11, 12, 13, 14, 15, 16, 17, 18, 19],
            TO: [63]
        }
    };

    if(!!commonjs) {
        module.export = br_phone;
    } else {
        window.br_phone = br_phone;
    }

    br_phone.phoneCodes = fillCodes();
})(document, window, typeof (exports) !== "undefined");
