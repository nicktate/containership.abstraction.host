'use strict';
const os = require('os');

class HostImplementation {

    constructor(orchestrator, host_id, mode, api_ip, api_port) {
        this.orchestrator = orchestrator;
        this.host_id = host_id || os.hostname();
        this.mode = mode;
        this.api_ip = api_ip;
        this.api_port = api_port;

        this.is_controlling_leader = false;
        this.cluster_id = null;
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

    // To be implemented in subclasses.
    getApi() {}

}

HostImplementation.MODES = {
    LEADER: 'leader',
    FOLLOWER: 'follower'
};

module.exports = HostImplementation;
