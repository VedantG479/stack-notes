export default function formatDate(dateStr){
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formattedDate
}