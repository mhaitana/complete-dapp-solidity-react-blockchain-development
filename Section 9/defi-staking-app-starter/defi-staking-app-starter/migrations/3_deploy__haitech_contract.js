const Haitech = artifacts.require('Haitech');

module.exports = async function(deployer) {
    await deployer.deploy(Haitech)
};
