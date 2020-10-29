const baseUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/"
class Service {
    getBikeInfo() {
        return fetch(baseUrl + "station_information.json").then(res => res.json());
    }

    getBikeStatus() {
        return fetch(baseUrl + "station_status.json").then(res => res.json());
    }
}

export default new Service();