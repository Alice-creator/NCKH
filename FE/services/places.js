const places = [
    {
        "location_id": "317896",
        "name": "Nhà thờ Đức Bà Sài Gòn",
        "latitude": "10.779801",
        "longitude": "106.69902",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/09/57/19/19/saigon-notre-dame-cathedral.jpg",
        "rating": "3.5",
        "address": "01 Công xã Paris Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        "description": "Một điểm check-in không thể bỏ lỡ khi đến TP. Hồ Chí Minh. Với kiến trúc cổ của Pháp cùng không gian sang trọng từ bên ngoài đến bên trong thánh đường, địa điểm này được coi là công trình nhà thờ Công giáo có quy mô lớn nhất Việt Nam và cũng là một trong những biểu tượng của Sài Gòn.",
        "story": "Nhà thờ Đức Bà Sài Gòn đã trải qua những thời điểm đầy biến động. Năm 1963, người Công giáo Ngô Đình Diệm đã bị lật đổ trong một cuộc đảo chính, và trong quá trình này, nhà thờ đã bị bắn phá và hư hại nghiêm trọng. Sau khi chiến tranh kết thúc, công trình này đã được sửa chữa và phục hồi lại để trở thành một trong những điểm tham quan du lịch nổi tiếng của Thành phố Hồ Chí Minh."
    },
    {
        "location_id": "311082",
        "name": "Nhà Thờ Lớn Hà Nội",
        "latitude": "21.028866",
        "longitude": "105.8542",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images":"https://media-cdn.tripadvisor.com/media/photo-o/0c/32/bb/34/nha-th-l-n-ha-n-i-40.jpg",
        "rating": "4.0",   
        "address": "40 Nhà Chung Hàng Trống, Hoàn Kiếm, Hà Nội",
        "description": "Đến với nơi đây, du khách sẽ được chiêm ngưỡng một công trình kiến trúc Gothic trung cổ Châu Âu đặc trưng, tìm hiểu lịch sử hình thành và phát triển của nhà thờ.",
        "story": "Nhà thờ được xây dựng từ năm 1886 đến năm 1887, trên khu đất trước đó là nơi đặt tượng Bác ái Thánh Phanxicô Xaviê, do giám mục Pigneau de Behaine tặng cho vua Gia Long vào năm 1799. Đây là nơi các tín đồ Công giáo có thể tìm đến để tham gia các nghi thức tôn giáo, cầu nguyện và hướng về Thiên Chúa"
    },
    {
        "location_id": "18314088",
        "name": "Landmark 81",
        "latitude": "10.794957",
        "longitude": "106.7214",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images":"https://media-cdn.tripadvisor.com/media/photo-m/1280/18/d1/66/35/getlstd-property-photo.jpg",
        "rating": "4.0",        
        "address": "720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        "description": "Tòa nhà cao nhất Việt Nam do tập đoàn Vingroup xây dựng vào năm 2015.Với kiến trúc hiện đại và đẳng cấp, Landmark 81 đã trở thành một trong những điểm tham quan nổi tiếng của thành phố Hồ Chí Minh, thu hút nhiều khách du lịch và người dân địa phương đến tham quan và chiêm ngưỡng toàn cảnh thành phố từ độ cao đáng kinh ngạc của tòa nhà này"
    },
    {
        "location_id": "6612108",
        "name": "Cầu Rồng",
        "latitude": "16.061203",
        "longitude": "108.227585",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Đà Nẵng",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/0d/3c/87/6e/cau-rong-da-nang-largejpg.jpg",
        "rating": "4.0",
        "address": "An Hải Trung Phuoc Ninh, Son Tra, Đà Nẵng",
        "description": "Một trong những cầu vượt biển đẹp nhất và nổi tiếng nhất ở Việt Nam, với cấu trúc thép và hệ thống đèn LED sáng trưng khiến cho cầu trở thành một điểm đến yêu thích của du khách và người dân địa phương.",
        "story": "Hình ảnh con rồng trên cầu là biểu tượng của sức mạnh, uy quyền, và địa vị của con rồng trong văn hóa dân tộc Việt Nam. Cầu Rồng cũng có ý nghĩa gắn liền với tên gọi của thành phố Đà Nẵng - thành phố biển, bởi hình dáng của cầu giống như một con rồng nổi trên mặt nước."
    },
    {
        "location_id": "311087",
        "name": "Chợ Bến Thành",
        "latitude": "10.772653",
        "longitude": "106.69792",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images":"https://media-cdn.tripadvisor.com/media/photo-o/0e/ee/c1/cd/stalls.jpg",
        "rating": "3.5",
        "address": "Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
        "description": "Không chỉ là nơi bán hàng hóa, mà còn là một khu phố tấp nập với những người bán hàng đông đúc và những khách du lịch đông đảo. Đây là nơi để bạn trải nghiệm sự sống động của thành phố, hòa mình vào không khí đầy sức sống và thưởng thức các món ăn đường phố ngon lành. Chợ Bến Thành là một địa điểm vui chơi, giải trí và mua sắm tuyệt vời khi bạn đến thăm thành phố Hồ Chí Minh.",
        "story": "Bến Thành là một trong những chợ truyền thống lâu đời nhất của Thành phố Hồ Chí Minh. Chợ được xây dựng lần đầu tiên và hoạt động từ thế kỷ 17 với tên gọi là 'Sài Gòn Market'. Sau đó, chợ đã trải qua nhiều lần sửa chữa, nâng cấp và mở rộng để trở thành một trong những điểm tham quan và mua sắm nổi tiếng nhất của thành phố."
    },
    {
        "location_id": "311077",
        "name": "Nhà Hát Lớn Hà Nội",
        "latitude": "21.02489",
        "longitude": "105.85952",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/70/b7/33/hanoi-opera-house.jpg",
        "rating": "4.0",
        "address": "01 Tràng Tiền Old Quarter, Hà Nội",
        "description": "Một trong những công trình kiến trúc nổi tiếng và quan trọng nhất của Việt Nam. Với kiến trúc pha trộn giữa phong cách cổ điển và hiện đại, tòa nhà này đã trở thành biểu tượng của thành phố Hà Nội.",
        "story": "Từ những năm đầu của thế kỷ 20, nơi đây đã trở thành trung tâm của sân khấu và âm nhạc truyền thống Việt Nam. Đến nay, Nhà Hát Lớn Hà Nội vẫn là nơi tổ chức các buổi biểu diễn văn hóa và nghệ thuật với những chương trình đa dạng, bao gồm nhạc kịch, ballet, opera, vở kịch, hội thảo, triển lãm và các sự kiện văn hóa khác. Năm 1945, Nhà hát l'Opéra de Hanoi trở thành trung tâm của sự kiện Lễ Tổng tuyển cử Quốc gia lịch sử đầu tiên của Việt Nam. Từ đó đến nay, Nhà hát Lớn Hà Nội đã trở thành một địa điểm quan trọng trong lịch sử chính trị, văn hóa và nghệ thuật của Việt Nam."
    },
    {
        "location_id": "317890",
        "name": "Dinh Độc Lập",
        "latitude": "10.777148",
        "longitude": "106.69544",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images":"https://media-cdn.tripadvisor.com/media/photo-m/1280/19/36/1a/be/hinh-chinh-di-n-dinh.jpg",         
        "rating": "4.0",
        "address": "106 Nguyễn Du Quận 1, Thành phố Hồ Chí Minh",
        "description": "Một công trình kiến trúc lịch sử ở thành phố Hồ Chí Minh. Là kiến trúc pha trộn giữa phong cách cổ điển và hiện đại, với những đường nét khối vuông chắc chắn, vững chãi. Hiện nay, Dinh Độc Lập thu hút du khách đến tham quan và tìm hiểu về lịch sử, văn hóa và kiến trúc của Việt Nam.",
        "story": "Trước khi Việt Nam thống nhất, Dinh Độc Lập từng là nơi làm việc của Tổng thống miền Nam, còn gọi là Việt Nam Cộng hòa. Khi Việt Nam thống nhất vào năm 1975, Dinh trở thành nơi làm việc của Chủ tịch nước và các lãnh đạo cấp cao khác của Việt Nam. Trong lịch sử đất nước, Dinh Độc Lập đã được sử dụng để tổ chức các sự kiện lịch sử quan trọng, bao gồm cuộc gặp giữa Chủ tịch Hồ Chí Minh và Tổng thống Mỹ Richard Nixon vào năm 1973."
    },   
    {
        "location_id": "2037764",
        "name": "Tháp Tài Chính Bitexco",
        "latitude": "10.77136",
        "longitude": "106.70428",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images":  "https://media-cdn.tripadvisor.com/media/photo-o/0c/81/55/ba/bitexco-financial-tower.jpg",     
        "rating": "4.0",   
        "address": "36 Hồ Tùng Mậu Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        "description": "Ngoài tính chất thương mại, tháp Bitexco còn mang ý nghĩa văn hóa và tượng trưng cho sự phát triển và tiến bộ của đất nước Việt Nam. Tháp Bitexco được xem là một biểu tượng của sự chuyển mình và phát triển của thành phố Hồ Chí Minh, từ một thành phố tập trung nông nghiệp sang một trung tâm kinh tế đang phát triển.Tháp Bitexco cũng mang ý nghĩa về mối quan hệ và hợp tác giữa Việt Nam và các đối tác quốc tế."
    },
    {
        "location_id": "311064",
        "name": "Lăng Chủ Tịch Hồ Chí Minh",
        "latitude": "21.036781",
        "longitude": "105.83464",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images":  "https://media-cdn.tripadvisor.com/media/photo-o/17/46/66/2c/pagepropertiesimage-largejpg.jpg",
        "rating": "4.0",
        "address": "2 Hùng Vương, Điện Bàn Ba Đình, Hà Nội",
        "description": "Một công trình kiến trúc lịch sử ở thủ đô Hà Nội. Lăng được xây dựng để tôn vinh và bảo tồn thi hài của Chủ tịch Hồ Chí Minh - người đã dẫn đầu cuộc đấu tranh giành độc lập, thống nhất và phát triển đất nước Việt Nam.",
        "story": "Lăng Chủ Tịch Hồ Chí Minh còn mang ý nghĩa về tình cảm của nhân dân Việt Nam dành cho Chủ tịch Hồ Chí Minh. Chủ tịch Hồ Chí Minh được coi là một người cha của đất nước, người đã dành cả cuộc đời để lãnh đạo đất nước và dành cho nhân dân Việt Nam tình yêu thương và sự hy sinh không ngừng."
    },
    {
        "location_id": "311089",
        "name": "Bưu điện trung tâm Sài Gòn",
        "latitude": "10.780134",
        "longitude": "106.69787",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images": "https://media-cdn.tripadvisor.com/media/photo-w/12/ae/e2/1f/post-office-interior.jpg",
        "rating": "4.0",
        "address": "Số 2 Công trường Công xã Paris, Quận 1, Thành phố Hồ Chí Minh",
        "description": "Một công trình kiến trúc lịch sử tại thành phố Hồ Chí Minh. Công trình này không chỉ là một địa chỉ giao nhận thư từ, mà còn mang ý nghĩa văn hóa, lịch sử và kỷ niệm về một thời kỳ quan trọng trong lịch sử đất nước Việt Nam.",
        "story": "Bưu điện Trung tâm Sài Gòn được xây dựng từ thế kỷ 19, mang ý nghĩa về một thời kỳ đầy biến động trong lịch sử đất nước Việt Nam. Công trình này đã trải qua nhiều thời kỳ lịch sử, từ thời kỳ thực dân Pháp đến thời kỳ chiến tranh Việt Nam. Bưu điện Trung tâm Sài Gòn còn là một nơi ghi dấu kỷ niệm và chứng nhận cho sự hy sinh và cống hiến của những người lính và nhân dân trong cuộc chiến tranh."
    },
    {
        "location_id": "11611968",
        "name": "Đường Hầm Điêu Khắc",
        "latitude": "11.883024",
        "longitude": "108.4106",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Đà Lạt, Tỉnh Lâm Đồng",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/0d/6a/21/3b/giao-x-mai-anh-t-i-du.jpg",
        "rating": "4.0",
        "address": "Phường 4 Thuộc Khu Vực Hồ Tuyền Lâm, Đà Lạt",
        "description": "Một công trình nghệ thuật độc đáo tại thành phố Đà Nẵng. Công trình này được xây dựng trên núi Ngũ Hành Sơn, với chiều dài hơn 1 km, với hàng loạt các điêu khắc tuyệt đẹp được chạm trên đá và gắn trên tường của đường hầm.",
        "story": "Đường Hầm Điêu Khắc là kết nối người xem với nghệ thuật đương đại, tạo ra một không gian độc đáo, táo bạo và sáng tạo, thể hiện sự đa dạng và tính cách của nghệ thuật đương đại. Thực hiện bởi nhiều nghệ sĩ nổi tiếng trên thế giới, mỗi người đều có phong cách và ý tưởng riêng để tạo ra những tác phẩm độc đáo và đa dạng. Các tác phẩm bao gồm tranh ảnh, điêu khắc, ánh sáng, âm thanh và các kỹ thuật nghệ thuật mới nhất, tạo nên một không gian độc đáo và phong phú."
    },
    {
        "location_id": "9750904",
        "name": "Hồ Gươm",
        "latitude": "10.775283",
        "longitude": "106.68916",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/0d/11/33/bb/photo0jpg.jpg",
        "rating": "4.5",
        "address": "135 Võ Văn Tần, Q.3, Thành phố Hồ Chí Minh",
        "description": "Không chỉ là một địa điểm du lịch nổi tiếng mà còn mang ý nghĩa lịch sử, văn hóa và tâm linh rất lớn đối với người dân Việt Nam. Mà còn là một trong những khu vực xanh lớn nhất của Hà Nội, là một oázis giữa lòng thành phố đông đúc. Du khách có thể thả mình vào không gian yên tĩnh và thư giãn bên bờ hồ, tận hưởng khung cảnh đẹp và hít thở không khí trong lành của một khu vực xanh mát",
        "story": "Hồ Gươm được xem là trái tim của Thăng Long – Đông Đô, tên gọi của Hà Nội trước khi Việt Nam trở thành một quốc gia độc lập. Hồ Gươm từng là nơi đóng quân của vua Lý Thái Tổ, người đã thành lập nên đất nước Việt Nam và xây dựng Thăng Long. Hồ Gươm cũng được xem là nơi sinh sống của rất nhiều nhân vật lịch sử quan trọng, như nhà thơ Nguyễn Du, người đã sáng tác bài thơ 'Truyện Kiều', và vị tướng quân Lê Lợi, người đã giành lại độc lập cho Việt Nam vào thế kỷ 15."
    },
    {
        "location_id": "311075",
        "name": "Chùa Một Cột",
        "latitude": "21.03376",
        "longitude": "105.8336",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/12/e3/61/a4/one-pillar-pagoda.jpg",
        "rating": "3.5",
        "address": "Phường Đội Cấn, quận Ba Đình, Hà Nội",
        "description": "Không chỉ nằm ở vẻ đẹp kiến trúc và sự độc đáo của nó, mà còn liên quan đến lịch sử và tín ngưỡng Phật giáo của đất nước, niềm tin vào sự may mắn, thành công và hạnh phúc trong cuộc sống. Người dân Việt Nam thường đến đây để cầu nguyện và thắp nhang, hy vọng sẽ được đức Phật ban phước và đem lại may mắn, hạnh phúc cho cuộc sống của mình.",
        "story": "Chùa Một Cột không chỉ nằm ở vẻ đẹp kiến trúc và sự độc đáo của nó, mà còn liên quan đến lịch sử và tín ngưỡng Phật giáo của đất nước. Theo truyền thuyết, ngôi chùa này được xây dựng dưới triều đại Lý, khi vua Lý Thái Tông đã mơ thấy Đức Phật Quan Âm đang ngồi trên một cột sen khổng lồ và thỉnh cầu cho một người con trai. Sau khi có con, vua Lý Thái Tông đã quyết định xây dựng chùa để tưởng nhớ sự hiện diện của Đức Phật Quan Âm trong giấc mơ."
    },
    {
        "location_id": "311083",
        "name": "Văn Miếu Quốc Tử Giám",
        "latitude": "21.02746",
        "longitude": "105.835",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/09/10/28/f9/temple-of-literature.jpg",      
        "rating": "4.5",
        "address": "Đường Quốc Tử Giám Quận Đống Đa, Hà Nội",
        "description": "Xây dựng theo kiến trúc cổ truyền của Trung Quốc, với các tòa nhà và hành lang được xây dựng bằng gỗ và được trang trí với các bức tượng và biểu tượng mang tính tượng trưng của sự học hành và tri thức. Văn Miếu Quốc Tử Giám cũng được coi là một nơi linh thiêng và được sử dụng để tổ chức các hoạt động văn hóa và tôn giáo của địa phương.",
        "story" : " Được xây dựng vào thế kỷ thứ 11, đây là nơi thờ cúng và tuyên truyền tri thức cho các thế hệ trí thức trong triều đình nhằm khuyến khích họ phát triển trí tuệ, trở thành những nhà quản lý tài ba cho đất nước. Các tài liệu cổ, sách vở và bài thi của các học sinh và thí sinh đã được lưu giữ tại Văn Miếu Quốc Tử Giám. Đây là nơi thể hiện rõ nét tư tưởng triết học và giáo dục của dân tộc Việt Nam. "
    },
    {
        "location_id": "317599",
        "name": "Kinh Thành Huế",
        "latitude": "16.468744",
        "longitude": "107.57835",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Huế, Tỉnh Thừa Thiên - Huế",
        "images":  "https://media-cdn.tripadvisor.com/media/photo-o/11/7a/57/7b/vue-interieure.jpg",
        "rating": "4.5",
        "address": "Thành phố Huế, Thừa Thiên Huế",
        "description": "Kinh thành Huế là một khu đô thị và khu di tích lịch sử nằm ở trung tâm thành phố Huế, xây dựng với kiến trúc đặc trưng của người Việt, được pha trộn với kiến trúc Trung Quốc và Pháp. Một trong những địa điểm du lịch phổ biến tại Việt Nam và thu hút hàng năm hàng triệu lượt khách du lịch đến tham quan và khám phá về lịch sử và văn hóa của đất nước. Ngoài ra, Kinh thành Huế cũng được UNESCO công nhận là di sản văn hóa thế giới vào năm 1993.",
        "story": "Nó được xây dựng trong thời kỳ đế quốc nhà Nguyễn (1802-1945) và bao gồm một loạt các cung điện, đền đài, thư viện, đền thờ, nhà hát, tượng đài và hệ thống đường nét kiến trúc. Đây là nơi đặt trụ sở của triều đình nhà Nguyễn trong hơn 140 năm, là nơi đóng góp vào sự phát triển của kiến trúc và nghệ thuật Việt Nam, đặc biệt là trong lĩnh vực kiến trúc cung điện."
    },
    {
        "location_id": "671834",
        "name": "Lang Biang",
        "latitude": "12.04892",
        "longitude": "108.44036",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Lac Duong, Tỉnh Lâm Đồng",
        "images":  "https://media-cdn.tripadvisor.com/media/photo-o/06/ee/9f/49/on-the-top.jpg",
        "rating": "4.0",
        "address": "Huyện Lạc Dương, tỉnh Lâm Đồng",
        "description": "Lang Biang là một ngọn núi cao nhất tại vùng đất đồi núi Tây Nguyên, nằm ở phía Nam thành phố Đà Lạt. Du khách có thể tham gia các hoạt động như leo núi, đi bộ đường dài và thưởng ngoạn cảnh quan tuyệt đẹp từ đỉnh núi. Ngoài ra, Lang Biang cũng là nơi để tổ chức các hoạt động văn hóa và lễ hội địa phương.",
        "story": "Lang Biang có ý nghĩa văn hóa và tôn giáo lớn đối với người dân địa phương. Theo truyền thuyết, tên của núi được đặt theo tên của một cặp tình nhân - một chàng trai K'Ho và một cô gái Chil. Họ đã được biến thành đôi núi Lang Biang và được coi là thần linh bảo vệ cho vùng đất Tây Nguyên."
    },
    {
        "location_id": "11950036",
        "name": "Núi Tao Phùng",
        "latitude": "10.326367",
        "longitude": "107.08458",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Vũng Tàu, Tỉnh Bà Rịa-Vũng Tàu",
        "images":"https://media-cdn.tripadvisor.com/media/photo-o/06/8f/7f/19/tuong-thanh-gioc.jpg",
        "rating": "4.5",
        "address": "Núi Nhỏ, Vũng Tàu",
        "description":"Núi Tao Phùng là một ngọn núi cao nhất tại vùng Tây Bắc Việt Nam. Một địa điểm du lịch thu hút nhiều khách du lịch đến tham quan và khám phá về văn hóa và phong cảnh địa phương. Du khách có thể leo núi, đi bộ đường dài và thưởng ngoạn cảnh quan tuyệt đẹp từ đỉnh núi.",
        "story": "Núi Tao Phùng có ý nghĩa lịch sử, văn hóa và tôn giáo quan trọng đối với người dân địa phương. Theo truyền thuyết, đây là nơi sinh sống của những người Mông, và là nơi có các đội quân Mông chống lại quân xâm lược Trung Hoa nhiều lần trong quá khứ. Ngoài ra, núi Tao Phùng cũng là một trong những điểm tâm linh quan trọng của người Mông tại khu vực này. Họ tin rằng núi này là nơi ẩn náu của các vị thần và tinh linh, và đến đây để thờ cúng và tổ chức các lễ hội truyền thống của địa phương."
    },
    {
        "location_id": "451012",
        "name": "Thung Lũng Tình Yêu",
        "latitude": "11.978178",
        "longitude": "108.44709",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Đà Lạt, Tỉnh Lâm Đồng",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/de/2b/83/overview.jpg",
        "rating": "4.0",
        "address": "3-5-7 Mai Anh Đào Phường 8, Tp Đà Lạt, Tỉnh Lâm Đồng, Đà Lạt",
        "description": "Được biết đến với cảnh quan đẹp, yên tĩnh và lãng mạn, tạo ra một không gian lãng mạn và thơ mộng cho những đôi tình nhân cùng nhau tham quan và tận hưởng không khí tình yêu. Với vẻ đẹp thiên nhiên tuyệt đẹp và văn hóa dân tộc độc đáo, Thung lũng tình yêu ngày nay trở thành một điểm đến lý tưởng cho những ai muốn khám phá văn hóa dân tộc và tìm hiểu về lịch sử, đồng thời cũng là một nơi để thư giãn, nghỉ ngơi và tận hưởng không khí trong lành.",
        "story": "Bắt đầu từ thời kỳ đầu lịch sử, khi các dân tộc sống trong khu vực bắt đầu tìm cách sinh sống và trồng trọt trên đất đai này. Khu vực này trở thành nơi sinh sống chính của người Thái đen. Khi nhìn vào văn hóa của người Thái, ta có thể thấy rõ ràng sự đan xen của các yếu tố văn hóa trong đó, từ trang phục, tài liệu, nhà cửa, thức ăn và cả những nghi lễ văn hóa khác. Trong những nghi lễ này, Thung lũng tình yêu được coi là trung tâm của văn hóa dân tộc Thái."
    },
    {
        "location_id": "19900590",
        "name": "Sun World Ba Na Hills",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Đà Nẵng",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/9c/ee/b4/caption.jpg",
        "rating": "3.5",
        "address": "Thôn An Sơn, xã Hòa Ninh, huyện Hòa Vang, TP Đà Nẵng",
        "description": "Nơi đây nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp và kiến trúc phương Tây độc đáo, có nhiều hoạt động và trải nghiệm độc đáo như đi cáp treo, tham quan các khu vườn, lâu đài, thưởng ngoạn cảnh quan và ngắm nhìn cảnh đẹp của Đà Nẵng từ trên cao. Nơi đây cũng có nhiều khu giải trí, trò chơi, trình diễn và các sự kiện hấp dẫn khác. Sun World Ba Na Hills cũng là một nơi lý tưởng để tận hưởng không khí trong lành, tĩnh lặng và nghỉ ngơi.",
        "story": "Khu du lịch được xây dựng trên dãy núi Ba Na, từng là nơi cư trú của người Pháp và được xây dựng từ thế kỷ 19. Nơi đây đã trở thành một địa điểm du lịch nổi tiếng kể từ khi được phục hồi và mở cửa lại vào năm 2009. Sun World Ba Na Hills đã thu hút rất nhiều khách du lịch trong và ngoài nước đến tham quan và trải nghiệm."
    },
    {
        "location_id": "317894",
        "name": "Thánh Địa Mỹ Sơn",
        "latitude": "15.763112",
        "longitude": "108.12408",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Duy Phú, Duy Xuyên Huyện, Tỉnh Quảng Nam",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/14/08/15/17/my-son-sanctuary.jpg",
        "rating": "4.0",
        "address": "Duy Phú, Huyện Duy Xuyên, Tỉnh Quảng Nam",
        "description": "Một khu di tích lịch sử và văn hóa của dân tộc Chăm ở Việt Nam. Được xây dựng từ thế kỷ thứ 4 đến thế kỷ thứ 14, thánh địa Mỹ Sơn là một tuyệt tác kiến trúc và nghệ thuật Chăm. Được UNESCO công nhận là Di sản Văn hóa thế giới vào năm 1999, nhằm bảo vệ và phát huy giá trị văn hóa, lịch sử và kiến trúc của khu di tích này."  ,
        "story" : "Cất giữ một phần quan trọng của lịch sử văn hóa của dân tộc Chăm và của Việt Nam nói chung. Đây là một trong những khu di tích kiến trúc đá cổ nhất và quan trọng nhất ở Đông Nam Á."
    },
    {
        "location_id": "451112",
        "name": "Tháp Bà Po Nagar",
        "latitude": "12.265535",
        "longitude": "109.19535",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Nha Trang, Khánh Hòa",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/09/b9/08/45/screenshot-2015-12-11.jpg", 
        "rating": "4.5",
        "address": "Đường 2 Tháng 4, Vĩnh Phước, Nha Trang, Khánh Hòa",
        "description": "Tháp Bà Po Nagar là một ngôi đền chùa thuộc vùng đất Nha Trang, tỉnh Khánh Hòa, Việt Nam. Được xây dựng vào khoảng thế kỷ VIII bởi người Chăm Pa, đền thờ tôn giáo Hinduism của họ. Với những giá trị lịch sử và văn hóa quý giá đó, Tháp Bà Po Nagar đã trở thành một điểm đến du lịch hấp dẫn, thu hút đông đảo khách du lịch trong và ngoài nước. Đây cũng là một nơi tham quan tâm linh được nhiều người quan tâm và tìm đến để cầu nguyện và thắp hương.",
        "story": "Tháp Bà Po Nagar được xây dựng để tôn vinh và thờ phụng các vị thần và thần nữ trong đạo Hinduism. Ngôi đền chùa này được xây dựng bởi người Chăm Pa, một dân tộc đã từng sống ở vùng đất này và có nền văn hóa phong phú. Tháp Bà Po Nagar là một trong những tàn tích lớn nhất và được bảo tồn tốt nhất của văn hóa Chăm Pa tại Việt Nam."
    },
    {
        "location_id": "9456964",
        "name": "Chùa Bửu Long",
        "latitude": "10.84284",
        "longitude": "106.82868",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Thành phố Hồ Chí Minh",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/17/94/14/d1/buu-long-temple.jpg",
        "rating": "4.5",
        "address": "81 đường Nguyễn Xiển, Phường Long Bình, Quận 9, Thành phố Hồ Chí Minh",
        "description": "Chùa được xây dựng theo kiến trúc phật giáo truyền thống, với những đường nét tinh tế và các tượng Phật được thêu thủ công tỉ mỉ. Nơi đây cung cấp một môi trường thuận tiện cho việc tu tập, thiền định và học tập về triết học Phật giáo.",
        "story": "Vào năm 1958, vị vua tịch Bảo Đại đã quyết định xây dựng tượng Phật Quan Âm cao nhất Việt Nam tại chùa Bửu Long. Tượng cao 32 mét, gọi là 'Quan Âm Cứu Khổ', trở thành biểu tượng nổi tiếng của chùa. Ngoài tượng Quan Âm, chùa còn có các công trình và kiến trúc đáng chú ý khác"
    },
    {
        "location_id": "2067946",
        "name": "Chùa Trấn Quốc",
        "latitude": "21.0478",
        "longitude": "105.83757",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Hà Nội",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/13/0f/3d/2a/chua-tran-quoc.jpg",
        "rating": "4.0",
        "address": "Đường Thanh Niên, phường Yên Phụ, quận Tây Hồ, thành phố Hà Nội",
        "description": "Với hơn 1500 năm lịch sử, chùa Trấn Quốc đại diện cho sự tôn trọng tôn giáo, kính trọng lịch sử và là một biểu tượng văn hóa độc đáo của Hà Nội. Kiến trúc đẹp mắt của chùa kết hợp giữa truyền thống và phong cách kiến trúc Á Đông, tạo nên một cảnh quan tuyệt đẹp trên hồ Tây",
        "story": "Vua Lý Nam Đế xây dựng chùa vào thế kỷ 6 và vua Lý Thái Tổ đổi tên thành Trấn Quốc Tự. Ngôi chùa có tượng Phật Bà Quan Âm đá quý và là biểu tượng tôn giáo và du lịch quan trọng của Hà Nội. "
    },
    {
        "location_id": "451111",
        "name": "Chùa Long Sơn",
        "latitude": "12.25012",
        "longitude": "109.18031",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Nha Trang, Khánh Hòa",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/0a/08/2e/f3/long-son-pagoda.jpg",
        "rating": "4.0",
        "address": "phường Phương Sơn, TP. Nha Trang",
        "description": "Chùa Long Sơn là một ngôi chùa đẹp mắt với kiến trúc độc đáo và ý nghĩa tôn giáo, lịch sử và du lịch. Kiến trúc của chùa Long Sơn kết hợp giữa phong cách Á Đông và kiến trúc Champa truyền thống. Mặt tiền của ngôi chùa được trang trí bằng những họa tiết màu sắc tinh tế, tạo nên một diện mạo rực rỡ và tráng lệ.",
        "story": "Vào thời kỳ đầu thực dân Pháp, ngôi chùa cũ ở Nha Trang bị cháy. Một nhóm tăng sĩ quyết định xây dựng một ngôi chùa mới tại đồi Ba Mụ. Trên hành trình xây dựng, họ gặp nhiều khó khăn về vật liệu và kinh phí. Tuy nhiên, nhờ sự đóng góp của người dân và tình yêu thương của những tín đồ Phật giáo, chùa Long Sơn được hoàn thành"
    },
    {
        "location_id": "13563044",
        "name": "Cáp Treo Hòn Thơm",
        "latitude": "10.027704",
        "longitude": "104.00767",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "An Thoi, Đảo Phú Quốc, Tỉnh Kiên Giang",
        "images": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1b/79/e3/dc/sun-world-hon-thom-nature.jpg",
        "rating": "4.5",         
        "address": "Bãi Đất Đỏ, đảo An Thới, Phú Quốc, tỉnh Kiên Giang",
        "description": "Đây là cáp treo dài nhất thế giới đi qua biển, với tổng chiều dài khoảng 8 km. Hành trình trên cáp treo Hòn Thơm mang đến cho du khách trải nghiệm hấp dẫn và độc đáo. Trên quãng đường bay, du khách có thể ngắm nhìn toàn cảnh vịnh An Thới, đồng cỏ xanh mướt và bãi biển tuyệt đẹp của Phú Quốc. Đây cũng là cơ hội để khám phá vẻ đẹp tự nhiên của đảo Hòn Thơm và thưởng thức không gian yên bình, tĩnh lặng trên biển.",
        "story": ""
    },
    {
        "location_id": "2227712",
        "name": "Biển Nha Trang",
        "latitude": "12.25062",
        "longitude": "109.1963",
        "timezone": "Asia/Ho_Chi_Minh",
        "location_string": "Nha Trang, Khanh Hoa Province",
        "images": "https://media-cdn.tripadvisor.com/media/photo-o/0c/aa/f4/46/photo2jpg.jpg",
        "rating": "4.0",
        "address": "Xã Cam Hải Đông, huyện Cam Lâm, Nha Trang",
        "description": "Biển Nha Trang có đặc điểm là nước biển trong suốt và có nhiều rạn san hô phong phú. Điều này tạo điều kiện thuận lợi cho việc snorkeling, lặn biển và khám phá đại dương. Du khách có thể khám phá vẻ đẹp đáy biển, ngắm nhìn hệ sinh thái biển đa dạng với hàng trăm loài san hô và các loài cá đa màu sắc.",
        "story": ""
    }
]
