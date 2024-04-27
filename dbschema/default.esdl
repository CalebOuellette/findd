using extension pgvector;

module default {
    scalar type openAIEmbedding extending ext::pgvector::vector<3072>;
    
    type User {
        required name: str;
        required description: str;
        required descriptionEmbedding: openAIEmbedding;
    }

    type Message {
        required text: str;
        required sender: UUID;
        required reciever: UUID;
        required isSytemMessage: bool;
    }
}
