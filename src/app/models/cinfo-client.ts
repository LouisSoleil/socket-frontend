export class CInfoClient {
    private m_nIdLog: number;
    private m_nIdClient: number;
    private m_sLoginClient: string;
    private m_sMdpClient: string;
    private m_sNomClient: string;
    private m_sPrenomClient: string;
    private m_nRoleClient: number;
    private m_sLibelleRoleClient: string;
    private sAdresseClient: string;
    private sNomAppClient: string;
    private sVersionAppClient: string;
    private dateConnexionClient: Date;
    private heureConnexionClient: string;
    private m_taMesSockets: [];
    private m_sUrlBdd: string;
    private m_sNomBdd: string;
    private m_sUtilisateurBdd: string;
    private m_sMdpBdd: string;
    private m_sTyeDemande: string;
    private m_bActionEffectue: boolean;
    private m_InfoModif: string;
    private m_bEstAdmin: boolean;
    private m_bEstActif: boolean;
    private m_bufferInfo: string;

    constructor(logClient: string, mdpClient: string, urlBdd: string, nomBdd: string, userBdd: string, mdpBdd: string){
        this.m_sLoginClient = logClient;
        this.m_sMdpClient = mdpClient;
        this.m_sUrlBdd = urlBdd;
        this.m_sNomBdd = nomBdd;
        this.m_sUtilisateurBdd = userBdd;
        this.m_sMdpBdd = mdpBdd;
    }
}
