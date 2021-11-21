pragma solidity >0.7.0 <0.9.0;

contract Pay {
    address owner;
    uint    pay;
    
    constructor() payable {
        owner = msg.sender;
        pay = msg.value;
    }
    
    address payable[] investorWallets;
    
    mapping(address => uint) payment;
    
    function payInvestors(address payable wallet, uint amount) public {
        investorWallets.push(wallet);
        payment[wallet] = payment[wallet] + amount;
    }
    
    function checkInvestorAmount(address wallet) public view returns (uint) {
        return payment[wallet];
    }
    
    function checkInvestors() public view returns (uint) {
        return investorWallets.length;
    }
}