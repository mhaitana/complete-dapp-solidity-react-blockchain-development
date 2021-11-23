// this is where our code goes

pragma solidity >=0.7.0 <0.9.0;

// create a contract that can store the data and return the data back

// be avle to to the following:

// 1. recieve information. 2. store information and 3. return the information back

contract simpleStorage {
    // write all the Code inside here - functions and its state
    
    uint storeData;
    
    function set(uint x) public {
        storeData = x;
    }
    
    function get() public view returns (uint) {
        return storeData;
    }
}

contract simpleStorageTimesFive {
    uint storeData;
    
    function set(uint x) public {
        storeData = x * 5;
    }
    
    function get() public view returns (uint) {
        return storeData;
    }
}

contract simpleStorageNames {
    string storeName;
    
    function set(string memory n) public {
        storeName = n;
    }
    
    function get() public view returns (string memory) {
        return storeName;
    }
}