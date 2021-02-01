from rest_framework import pagination, response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 2

    def get_paginated_response(self, data):
        """ページネーションをカスタマイズ"""
        return response.Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data,
        })
