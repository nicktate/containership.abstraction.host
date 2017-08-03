'use strict';
const os = require('os');
const _ = require('lodash');

class HostImplementation {

    constructor(orchestrator, host_id, mode, api_ip, api_port, network_interface) {
        this.orchestrator = orchestrator;
        this.host_id = host_id || os.hostname();
        this.mode = mode || 'leader';
        this.api_ip = api_ip || process.env.API_IP;
        this.api_port = api_port || process.env.API_PORT;
        this.is_controlling_leader = false;
        this.cluster_id = null;
        this.network_interface = network_interface;
        this.containershipMetadata = {};
    }

    setOperatingMode(mode) {
        this.mode = mode;
    }

    getOperatingMode() {
        return this.mode;
    }

    setOrchestrator(orchestrator) {
        this.orchestrator = orchestrator;
    }

    getOrchestrator() {
        return this.orchestrator;
    }

    setId(host_id) {
        this.host_id = host_id;
    }

    getId() {
        return this.host_id;
    }

    setIsControllingLeader(is_controlling_leader) {
        if(this.isLeader()) {
            this.is_controlling_leader = is_controlling_leader;
        } else {
            if(is_controlling_leader) {
                throw new Error('Cannot set controlling leader on non-leader node.');
            }
        }
    }

    isControllingLeader() {
        return this.is_controlling_leader;
    }

    isLeader() {
        return this.mode === HostImplementation.MODES.LEADER;
    }

    getApiIp() {
        return this.api_ip;
    }

    getApiPort() {
        return this.api_port;
    }

    getApiBaseUrl() {
        return `http://${this.api_ip}:${this.api_port}`;
    }

    // Override as needed.
    getApiVersion() {
        return 'v1';
    }

    setClusterId(cluster_id) {
        this.cluster_id = cluster_id;
    }

    getClusterId() {
        return this.cluster_id;
    }

    setNetworkInterface(network_interface) {
        this.network_interface = network_interface;
    }

    getContainershipMetadata() {
        return this.containershipMetadata;
    }

    setContainershipMetadata(attrs) {
        this.containershipMetadata = _.merge(this.containershipMetadata, attrs);
    }

    getNetworkInterface() {
        return this.network_interface;
    }

    // To be implemented in subclasses.
    getApi() {}

}

HostImplementation.MODES = {
    LEADER: 'leader',
    FOLLOWER: 'follower'
};

module.exports = HostImplementation;
