'use strict';

class HostImplementation {

    constructor(orchestrator, mode, leaderIP, apiPort, host_id) {
        this.orchestrator = orchestrator;
        this.mode = mode;
        this.leaderIP = leaderIP;
        this.apiPort = apiPort;
        this.host_id = host_id;

        this.isControllingLeader = false;
    }

    setLeaderIPAndPort(leaderIP, apiPort) {
        this.leaderIP = leaderIP;
        this.apiPort = apiPort;
    }

    setOperatingMode(mode) {
        this.mode = mode;
    }

    getOperatingMode() {
        return this.mode;
    }

    getOrchestrator() {
        return this.orchestrator;
    }

    getID() {
        return this.host_id;
    }

    setIsControllingLeader(v) {
        if(this.isLeader()) {
            this.isControllingLeader = v;
        } else {
            if(v) {
                throw new Error('Cannot set controlling leader on non-leader node.');
            }
        }
    }

    isControllingLeader() {
        return this.isControllingLeader;
    }

    isLeader() {
        return this.mode === HostImplementation.MODES.LEADER;
    }

    getApiIP() {
        return this.leaderIP;
    }

    getApiPort() {
        return this.apiPort;
    }

    getApiBaseUrl() {
        return `http://${this.leaderIP}:${this.apiPort}`;
    }

    // Override as needed.
    getApiVersion() {
        return 'v1';
    }

    // To be implemented in subclasses.

    getClusterId() {}
    getApi() {}

}

HostImplementation.MODES = {
    LEADER: 'leader',
    FOLLOWER: 'follower'
};

module.exports = HostImplementation;
